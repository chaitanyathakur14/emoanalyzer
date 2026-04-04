import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, CheckCircle2 } from "lucide-react";

const ALL_EXERCISES = [
  { id: "1", title: "Box Breathing", duration: "4 Min", category: "Regulation", mood: "calm", desc: "Reset the nervous system under stress." },
  { id: "2", title: "Affect Labeling", duration: "5 Min", category: "Awareness", mood: "reflect", desc: "Put feelings into words to reduce intensity." },
  { id: "3", title: "Vagus Nerve Reset", duration: "2 Min", category: "Regulation", mood: "calm", desc: "Physical signals to force body relaxation." },
  { id: "4", title: "Perspective Shifting", duration: "6 Min", category: "Social", mood: "reflect", desc: "View a situation through another's eyes." },
  { id: "5", title: "Gratitude Sprints", duration: "1 Min", category: "Motivation", mood: "energize", desc: "Rapid listing of 3 micro-wins." },
  { id: "6", title: "Stoic Reframing", duration: "5 Min", category: "Regulation", mood: "reflect", desc: "Divide world into what you control vs don't." },
  { id: "7", title: "The 'Victory Pose'", duration: "2 Min", category: "Motivation", mood: "energize", desc: "Body language hack for confidence." },
  { id: "8", title: "Mirroring Practice", duration: "8 Min", category: "Social", mood: "reflect", desc: "Master deep empathy via active listening." },
  { id: "9", title: "Future Self Scripting", duration: "10 Min", category: "Awareness", mood: "energize", desc: "Write from your highest emotional potential." },
  { id: "10", title: "Micro-Meditation", duration: "3 Min", category: "Regulation", mood: "calm", desc: "Instant mindfulness for the busy mind." }
];

export const WellnessExercises = () => {
  // Randomizes the list on each component mount
  const randomized = useMemo(() => [...ALL_EXERCISES].sort(() => Math.random() - 0.5), []);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">Wellness Gym</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {randomized.map((ex) => (
          <Card key={ex.id} className="p-6 border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-indigo-50 text-indigo-600 border-none">{ex.category}</Badge>
              <div className="flex items-center text-xs text-slate-400"><Clock className="h-3 w-3 mr-1" /> {ex.duration}</div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600">{ex.title}</h3>
            <p className="text-slate-500 text-sm mt-2">{ex.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};