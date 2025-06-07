'use client';

import { useEffect, useState } from 'react';
import { fetchEvents } from '@/lib/supabase/fetchEvents';
import CopilotChatWrapper from "@/components/CopilotChatWrapper";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    loadEvents();
  }, []);

  const today = new Date();
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);

  // Filter out past events (keep today and future events)
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6">
      <div className="p-6 space-y-5">
        <h1 className="text-4xl font-extrabold mb-2">Events</h1>
        <p className="text-gray-300">Explore all upcoming events within the campus</p>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-400">No upcoming events</p>
        ) : (
          upcomingEvents.map((event) => {
            const eventDate = new Date(event.date);
            const todayDate = new Date();

            const isToday = eventDate.toDateString() === todayDate.toDateString();

            return (
              <div
                key={event.id}
                className={`border p-6 rounded shadow rounded-3xl ${
                  isToday ? 'bg-purple-500 border-purple-500' : 'bg-white'
                }`}
              >
                <h2 className={`text-xl font-semibold ${isToday ? 'text-white' : 'text-black'}`}>
                  {event.title} {isToday && <span className="text-white font-semibold"> - Today</span>}
                </h2>
                <p className={`${isToday ? 'text-white' : 'text-black'}`}>
                  {event.description}
                </p>
                <p className={`text-sm ${isToday ? 'text-white pt-4' : 'text-black '}`}>
                  📅 {event.date}
                </p>
                
              </div>
            );
          })
        )}
      </div>
      <CopilotChatWrapper />
    </main>
  );
}