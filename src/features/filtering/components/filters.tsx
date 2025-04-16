'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcn/ui/card';
import TagQuery from '../../../shared/components/journal/home/filters/tag-query';
import GoalQuery from '../../../shared/components/journal/home/filters/goal-query';
import { Separator } from '@/shared/components/shadcn/ui/separator';
import MoodQuery from '../../../shared/components/journal/home/filters/mood-query';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/shadcn/ui/dialog';
import { Input } from '@/shared/components/shadcn/ui/input';
import { Label } from '@/shared/components/shadcn/ui/label';
import { Textarea } from '@/shared/components/shadcn/ui/textarea';
import { PlusCircle, Edit, Trash2, } from 'lucide-react';
import { Goal, Tag } from '@/utils/types';

export default function Filters({
  goals,
  tags,
}: {
  goals: Goal[];
  tags: Tag[];
}) {


  return (
    <Card className="font-onest mb-10 hidden lg:block overflow-y-scroll h-[calc(70vh-4rem)]">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Tags</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Manage Tags</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] font-onest">
              <DialogHeader>
                <DialogTitle>Manage Tags</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-tag-label" className="text-right">
                    Label
                  </Label>
                  <Input
                    id="new-tag-label"
                
                    className="col-span-3"
                  />
                </div>
                <Button className="ml-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Tag
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="max-h-[200px] overflow-y-auto">
                {tags.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">
                      No tags yet. Add your first tag to get started!
                    </p>
                  </div>
                ) : (
                  tags.map((tag) => (
                    <div
                      key={tag.tag_id}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="font-medium">{tag.label}</span>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                         
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* {editingTag && (
                <div className="mt-4 space-y-4">
                  <Input
                    value={editingTag.label ?? ''}
                    onChange={(e) =>
                      setEditingTag({ ...editingTag, label: e.target.value })
                    }
                    placeholder="Edit label"
                  />
                  <Button onClick={handleEditTag}>Save Changes</Button>
                </div>
              )} */}
            </DialogContent>
          </Dialog>
        </div>
        <TagQuery tags={tags} />
        <Separator />
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Goals</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Manage Goals</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] font-onest">
              <DialogHeader>
                <DialogTitle>Manage Goals</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-goal-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="new-goal-title"
                
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-goal-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="new-goal-description"
                   
                    className="col-span-3"
                  />
                </div>
                <Button className="ml-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="max-h-[200px] overflow-y-auto">
                {/* {currentGoals.length === 0 ? (
                  <div className="text-center py-4">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      No goals yet. Set your first goal to get started!
                    </p>
                  </div>
                ) : (
                  goals.map((goal) => (
                    <div
                      key={goal.goal_id}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="font-medium">{goal.title}</span>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingGoal(goal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteGoal(goal.goal_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )} */}
              </div>
              {/* {editingGoal && (
                <div className="mt-4 space-y-4">
                  <Input
                    value={editingGoal.title ?? ''}
                    onChange={(e) =>
                      setEditingGoal({ ...editingGoal, title: e.target.value })
                    }
                    placeholder="Edit title"
                  />
                  <Textarea
                    value={editingGoal.description ?? ''}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        description: e.target.value,
                      })
                    }
                    placeholder="Edit description"
                  />
                  <Button onClick={handleEditGoal}>Save Changes</Button>
                </div>
              )} */}
            </DialogContent>
          </Dialog>
        </div>
        <GoalQuery goals={goals} />
        <Separator />
        <MoodQuery />
      </CardContent>
    </Card>
  );
}
