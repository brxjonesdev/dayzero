import React from 'react'

export default function JournalEntries({entries}: {entries: any[] | null}) {
  return (
    <div>
        {entries?.map((entry) => (
            <div key={entry.id} className="bg-white dark:bg-black/20 p-4 rounded-lg shadow-lg">
                <p>Entry!</p>
            </div>
        ))}
    </div>
  )
}
