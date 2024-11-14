'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';
import { Label } from '@/components/shadcn/ui/label';
import { createClient } from '@/utils/supabase/client';
import { nanoid } from 'nanoid';

interface TagType {
  id: number;
  label: string;
  value: string;
}

export default function TagManagement() {
  const supabase = createClient();
  const [tags, setTags] = useState<TagType[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState({ label: '', value: '' });
  const [editingTag, setEditingTag] = useState<TagType | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: tags, error } = await supabase
        .from('tags')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error fetching tags:', error);
      }
      if (tags) {
        setTags(tags);
        setUserId(user?.id);
      }
    };
    fetchTags();
  }, []);

  const addTag = async () => {
    if (newTag.label && newTag.value && userId) {
      const { data, error } = await supabase
        .from('tags')
        .insert({
          label: newTag.label,
          value: newTag.value,
          user_id: userId,
          tag_id: `tag_${nanoid(15)}-${nanoid(3)}`,
        })
        .select();

      if (error) {
        console.error('Error adding tag:', error);
      } else if (data) {
        setTags([...(tags || []), data[0]]);
        setNewTag({ label: '', value: '' });
      }
    }
  };

  const updateTag = async () => {
    if (editingTag) {
      const { error } = await supabase
        .from('tags')
        .update({ label: editingTag.label, value: editingTag.value })
        .eq('id', editingTag.id);

      if (error) {
        console.error('Error updating tag:', error);
      } else {
        setTags(
          tags?.map((tag) => (tag.id === editingTag.id ? editingTag : tag)) ||
            null
        );
        setEditingTag(null);
      }
    }
  };

  const deleteTag = async (id: number) => {
    const { error } = await supabase.from('tags').delete().eq('id', id);

    if (error) {
      console.error('Error deleting tag:', error);
    } else {
      setTags(tags?.filter((tag) => tag.id !== id) || null);
    }
  };

  return (
    <main className="flex-1 flex flex-col font-onest p-6 overflow-y-scroll">
      <div className="mb-6">
        <h2 className="font-unbounded text-2xl font-bold">Your Tags</h2>
      </div>
      <div className="flex gap-4 h-full overflow-y-scroll">
        <Card className="h-fit w-4/12">
          <CardHeader>
            <CardTitle>Add New Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTag();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  placeholder="Enter tag label"
                  value={newTag.label}
                  onChange={(e) =>
                    setNewTag({ ...newTag, label: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  placeholder="Enter tag value"
                  value={newTag.value}
                  onChange={(e) =>
                    setNewTag({ ...newTag, value: e.target.value })
                  }
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={addTag} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Tag
            </Button>
          </CardFooter>
        </Card>

        {tags === null ? (
          <Card className="col-span-full w-8/12">
            <CardContent className="flex flex-col items-center justify-center py-12 h-full">
              <Tag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Loading...</h3>
              <p className="text-muted-foreground text-center">
                Please wait while we fetch your tags.
              </p>
            </CardContent>
          </Card>
        ) : tags.length === 0 ? (
          <Card className="col-span-full w-8/12">
            <CardContent className="flex flex-col items-center justify-center py-12 h-full">
              <Tag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tags yet</h3>
              <p className="text-muted-foreground text-center">
                Start by adding a new tag to organize your content.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full space-y-4 overflow-y-scroll flex-1">
            {tags.map((tag) => (
              <Card key={tag.id} className="w-full">
                <CardHeader>
                  <CardTitle>{tag.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Value: {tag.value}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setEditingTag(tag)}
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Tag</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateTag();
                        }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="edit-label">Label</Label>
                          <Input
                            id="edit-label"
                            value={editingTag?.label || ''}
                            onChange={(e) =>
                              setEditingTag({
                                ...editingTag!,
                                label: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-value">Value</Label>
                          <Input
                            id="edit-value"
                            value={editingTag?.value || ''}
                            onChange={(e) =>
                              setEditingTag({
                                ...editingTag!,
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
                      </form>
                      <DialogFooter>
                        <Button onClick={updateTag}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => deleteTag(tag.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
