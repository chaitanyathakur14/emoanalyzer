import React, { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Heart,
  BookOpen,
  Wind,
  Smile,
  BarChart2,
  CheckSquare,
  Repeat,
  Quote,
  MapPin,
  Globe
} from "lucide-react";

// --- Mock UI Components ---
const Card = ({ className, ...props }) => <div {...props} className={`border rounded-xl shadow-sm bg-white ${className}`} />;
const Button = ({ className, variant, size, ...props }) => {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
    const sizeClasses = { icon: "h-10 w-10", sm: "h-9 px-3", default: "h-10 px-4 py-2" };
    const variantClasses = {
        hero: "bg-indigo-600 text-white hover:bg-indigo-700",
        outline: "border-gray-300 bg-transparent hover:bg-gray-100",
        ghost: "hover:bg-gray-100",
    };
    return <button {...props} className={`${base} ${sizeClasses[size] || sizeClasses.default} ${variantClasses[variant] || 'bg-indigo-600 text-white hover:bg-indigo-700'} ${className}`} />;
};
const Input = (props) => <input {...props} className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className}`} />;

// --- Data ---

const CLINIC_DATA = [
    { name: "Total Health", rating: 5.0, specialty: "Psychologist", address: "B wing, Viral Appts, Swami Vivekananda Rd, opp. Shoppers Stop", phone: "09967843249", quote: "Exceptional care for depression and other mental health issues." },
    { name: "Omni Health Services", rating: 4.8, specialty: "Psychologist", address: "Office No. 303, Unique House, Chakala Rd", phone: "09653677486", quote: "Qualified professionals, great clinic ambiance and excellent care." },
    { name: "Amaha Mental Health Centre", rating: 4.8, specialty: "Psychologist", address: "Unit 601, 6th floor, Notan Heights, 20, Gurunanak Rd", phone: "02071171501", quote: "A safe space with expert therapists.", website: "#" },
    { name: "Dr Jayesh Ghodke - Mind Clinic", rating: 4.9, specialty: "Psychiatrist", address: "EXPRESS ZONE, Mall, off Western Express Highway", phone: "07654782669", quote: "Collaborative approach ensured comprehensive mental health care.", website: "#" },
    { name: "Harmony Mind Clinic", rating: 5.0, specialty: "Psychologist", address: "19th Floor, Panchratna Building, near Opera House", phone: "09326652219", quote: "Best Psychiatrists in Mumbai for various treatments.", website: "#" },
    { name: "Dr. Amitabh Ghosh", rating: 4.9, specialty: "Psychiatrist", address: "VITATSU Healthcare, B-107, Twin Towers, Lokhandwala", phone: "09820199503", quote: "Helped my family to overcome emotional trauma.", website: "#" },
    { name: "Trijog", rating: 4.8, specialty: "Psychologist", address: "B-Wing, 406, Powai Plaza, opp. Nirvana Park", phone: "09619196949", quote: "The counselling sessions really helped me with my mental health struggles.", website: "#" },
    { name: "Astitva Clinic", rating: 4.7, specialty: "Psychologist", address: "Krishna Niwas, 522/B, R P Masani Marg", phone: "09136008076", quote: "They have a good grasp on human psychology and mental health.", website: "#" },
];

const dailyCheckinQuestions = [
    "What is one thing you're looking forward to today?",
    "What's a small act of kindness you could do for yourself today?",
    "If you could describe your current mood as a color, what would it be and why?",
];

const moodColors = {
    happy: 'bg-yellow-400', sad: 'bg-blue-500', anxious: 'bg-purple-500',
    angry: 'bg-red-500', stressed: 'bg-orange-500', grateful: 'bg-green-500',
};

const botResponses = {
    emotions: {
        happy: {
            acknowledgement: "I'm so glad to hear you're feeling happy! Let's celebrate that joy together.",
            library: {
                songs: [
                    "Happy – Pharrell Williams", "Can't Stop the Feeling – Justin Timberlake",
                    "Good Vibrations – The Beach Boys", "Walking on Sunshine – Katrina & The Waves",
                    "Lovely Day – Bill Withers", "Uptown Funk – Bruno Mars",
                    "Shake It Off – Taylor Swift", "Best Day of My Life – American Authors",
                    "Roar – Katy Perry", "Firework – Katy Perry",
                    "Sugar – Maroon 5", "Don't Worry Be Happy – Bobby McFerrin",
                    "I Gotta Feeling – Black Eyed Peas", "Valerie – Amy Winehouse",
                    "On Top of the World – Imagine Dragons", "Happy Together – The Turtles",
                    "Good Life – OneRepublic", "Three Little Birds – Bob Marley",
                    "Viva La Vida – Coldplay", "I'm a Believer – Smash Mouth"
                ],
                books: [
                    "The Happiness Project – Gretchen Rubin", "Joyful – Ingrid Fetell Lee",
                    "The Art of Happiness – Dalai Lama", "The Book of Joy – Dalai Lama & Desmond Tutu",
                    "Happier – Tal Ben-Shahar", "Flow – Mihaly Csikszentmihalyi",
                    "The Power of Now – Eckhart Tolle", "The Little Book of Hygge – Meik Wiking",
                    "Man's Search for Meaning – Viktor Frankl", "You Are a Badass – Jen Sincero",
                    "Big Magic – Elizabeth Gilbert", "Atomic Habits – James Clear",
                    "Mindset – Carol Dweck", "The Four Agreements – Don Miguel Ruiz",
                    "The Untethered Soul – Michael Singer", "Start with Why – Simon Sinek",
                    "Daring Greatly – Brené Brown", "The Gifts of Imperfection – Brené Brown",
                    "Make Your Bed – Admiral McRaven", "Drive – Daniel Pink"
                ],
                exercises: [
                    "Dance to your favorite upbeat song", "Go for a 10-minute walk outside",
                    "Do 15 jumping jacks", "Write down 3 things you're grateful for",
                    "Stretch for 5 minutes", "Sing your favorite happy song aloud",
                    "Try 5 deep belly breaths while smiling", "Draw or doodle something fun",
                    "Do a quick 5-minute meditation", "Text a friend to share good news",
                    "Drink a glass of water slowly and mindfully", "Look at a photo that makes you happy",
                    "Play a fun game", "Spend 5 minutes in sunlight", "Make a small positive note for yourself",
                    "Compliment someone today", "Cook or eat your favorite snack mindfully",
                    "Laugh out loud for 30 seconds", "Do a random act of kindness", "Visualize a joyful memory"
                ],
                affirmations: [
                    "I deserve to feel this joy.", "Happiness flows through me effortlessly.",
                    "I am grateful for the good in my life.", "I radiate positivity and joy.",
                    "I choose happiness in this moment.", "Joy is my natural state.",
                    "I celebrate my achievements and progress.", "I am worthy of love and laughter.",
                    "Every day is filled with new opportunities.", "I embrace the beauty around me.",
                    "I spread happiness wherever I go.", "I attract positive experiences.",
                    "I am at peace with myself and others.", "I find joy in simple moments.",
                    "I am confident in expressing my happiness.", "I release negativity and embrace positivity.",
                    "I welcome happiness into my heart.", "My smile can brighten my day.",
                    "I cherish moments of laughter.", "I am grateful for all joyful experiences."
                ]
            }
        },
        sad: {
            acknowledgement: "It's okay to feel sad. Acknowledging your feelings is a brave first step. I'm here to sit with you in this feeling.",
            library: {
                songs: [
                    "Fix You – Coldplay", "Someone Like You – Adele",
                    "Hurt – Johnny Cash", "Tears in Heaven – Eric Clapton",
                    "Everybody Hurts – R.E.M.", "The Night We Met – Lord Huron",
                    "Skinny Love – Bon Iver", "Stay – Rihanna",
                    "Creep – Radiohead", "Yesterday – The Beatles",
                    "Say Something – A Great Big World", "All I Want – Kodaline",
                    "Let Her Go – Passenger", "The Scientist – Coldplay",
                    "I Will Always Love You – Whitney Houston", "Nothing Compares 2 U – Sinead O’Connor",
                    "Jealous – Labrinth", "Un-break My Heart – Toni Braxton",
                    "Hallelujah – Jeff Buckley", "Everybody's Got to Learn Sometime – Beck"
                ],
                books: [
                    "The Midnight Library – Matt Haig", "Reasons to Stay Alive – Matt Haig",
                    "When Things Fall Apart – Pema Chodron", "Man's Search for Meaning – Viktor Frankl",
                    "The Comfort Book – Matt Haig", "Option B – Sheryl Sandberg",
                    "Lost Connections – Johann Hari", "Rising Strong – Brené Brown",
                    "The Book of Hope – Jane Goodall", "Furiously Happy – Jenny Lawson",
                    "Radical Acceptance – Tara Brach", "Feeling Good – David D. Burns",
                    "Emotional Intelligence – Daniel Goleman", "Self-Compassion – Kristin Neff",
                    "The Art of Comforting – Val Walker", "Daring Greatly – Brené Brown",
                    "Tiny Beautiful Things – Cheryl Strayed", "Healing the Shame that Binds You – John Bradshaw",
                    "The Gifts of Imperfection – Brené Brown", "The Untethered Soul – Michael Singer"
                ],
                exercises: [
                    "Write down 3 things you’re grateful for", "Take 5 deep breaths mindfully",
                    "Write a letter to yourself", "Stretch gently for 5 minutes",
                    "Listen to calming music", "Go for a short walk outside",
                    "Draw your feelings", "Call a trusted friend", "Meditate for 5 minutes",
                    "Write a journal entry about your day", "Focus on positive memories",
                    "Spend time with a pet", "Declutter a small area", "Drink water mindfully",
                    "Practice grounding by naming 5 things you see", "Practice progressive muscle relaxation",
                    "Take a warm shower", "Write down your strengths", "Read an uplifting quote", "Give yourself a small reward"
                ],
                affirmations: [
                    "My feelings are valid and they will pass.", "I am allowed to feel this way.",
                    "I am gentle with myself in tough times.", "This too shall pass.",
                    "I am worthy of love and care.", "I honor my emotions without judgment.",
                    "I am resilient and strong.", "I give myself permission to heal.",
                    "I choose to be kind to myself.", "I release what I cannot control.",
                    "I am enough as I am.", "I allow myself to feel fully.",
                    "I trust that this moment will pass.", "I am proud of my efforts today.",
                    "I nurture myself with compassion.", "I accept my feelings as they are.",
                    "I am open to hope and healing.", "I forgive myself for mistakes.",
                    "I am safe and supported.", "I am learning and growing every day."
                ]
            }
        },
        anxious: {
            acknowledgement: "I can sense your anxiety. Let’s slow down together and find calm.",
            library: {
                songs: [
                    "Weightless – Marconi Union", "Clair de Lune – Debussy",
                    "River Flows in You – Yiruma", "Electra – Airstream",
                    "Mellomaniac – DJ Shah", "Canzonetta Sull'aria – Mozart",
                    "Watermark – Enya", "Someone Like You – Adele",
                    "Hallelujah – Jeff Buckley", "Spiegel im Spiegel – Arvo Pärt",
                    "Experience – Ludovico Einaudi", "Nocturne in E-flat – Chopin", "The Ocean – Mike Perry",
                    "Comptine d’un autre été – Yann Tiersen", "Gymnopédie No.1 – Erik Satie",
                    "Breathe – Pink Floyd", "Nuvole Bianche – Ludovico Einaudi", "Ameno – Era",
                    "A Day in the Life – Coldplay", "Let Her Go – Passenger"
                ],
                books: [
                    "The Untethered Soul – Michael A. Singer", "Wherever You Go, There You Are – Jon Kabat-Zinn",
                    "The Miracle of Mindfulness – Thich Nhat Hanh", "Radical Acceptance – Tara Brach",
                    "The Anxiety and Phobia Workbook – Edmund Bourne", "Feeling Good – David D. Burns",
                    "Self-Compassion – Kristin Neff", "Daring Greatly – Brené Brown",
                    "The Gifts of Imperfection – Brené Brown", "Meditation for Fidgety Skeptics – Dan Harris",
                    "Waking Up – Sam Harris", "10% Happier – Dan Harris",
                    "The Mindful Way Through Anxiety – Susan M. Orsillo", "Resilient – Rick Hanson",
                    "Hardwiring Happiness – Rick Hanson", "Full Catastrophe Living – Jon Kabat-Zinn",
                    "Calm – Michael Acton Smith", "The Book of Joy – Dalai Lama", "The Power of Now – Eckhart Tolle",
                    "Emotional Intelligence – Daniel Goleman"
                ],
                exercises: [
                    "Try the 4-7-8 breathing technique", "Progressive muscle relaxation for 5 minutes",
                    "Go for a mindful walk", "Write down your worries and release them",
                    "Focus on your senses for grounding", "Meditate for 5–10 minutes",
                    "Stretch gently while breathing deeply", "Listen to calming music",
                    "Visualize a safe place", "Drink water mindfully", "Practice yoga poses",
                    "Write a comforting note to yourself", "Do 5 slow neck rolls",
                    "Take a warm shower", "Journal your anxious thoughts", "Repeat calming affirmations",
                    "Count backward from 100 slowly", "Focus on one task at a time", "Declutter a small area", "Smile and notice it"
                ],
                affirmations: [
                    "This feeling is temporary and I am safe.", "I am capable of handling this moment.",
                    "I trust myself to get through this.", "I release tension with every breath.",
                    "I am calm and centered.", "I allow myself to feel and let go.",
                    "I am strong and resilient.", "I focus on what I can control.",
                    "I am learning to manage my anxiety.", "Peace is within my reach.",
                    "I choose calm over worry.", "I am present in this moment.",
                    "I trust the process of life.", "I am gentle with myself.", "I can handle uncertainty.",
                    "I release fear and embrace courage.", "I deserve peace and serenity.", "I focus on solutions, not problems.",
                    "I breathe in calm and exhale stress.", "I am safe, supported, and cared for."
                ]
            }
        },
        stressed: {
            acknowledgement: "I hear that you're stressed. Let's find a way to lighten that burden together.",
            library: {
                songs: [...Array(20).keys()].map(i => `Stress Relief Song ${i+1}`),
                books: [...Array(20).keys()].map(i => `Stress Management Book ${i+1}`),
                exercises: [...Array(20).keys()].map(i => `Stress Relief Exercise ${i+1}`),
                affirmations: [...Array(20).keys()].map(i => `I manage my stress effectively ${i+1}`)
            }
        },
        angry: {
            acknowledgement: "Anger is a powerful emotion. Let’s channel it safely and calmly.",
            library: {
                songs: [...Array(20).keys()].map(i => `Anger Release Song ${i+1}`),
                books: [...Array(20).keys()].map(i => `Anger Management Book ${i+1}`),
                exercises: [...Array(20).keys()].map(i => `Anger Release Exercise ${i+1}`),
                affirmations: [...Array(20).keys()].map(i => `I release anger peacefully ${i+1}`)
            }
        }
    },
    followUp: "Would you like me to suggest another song, book, or exercise?"
};


// --- Child Component for Clinic Cards ---
const ClinicCard = ({ clinic }) => (
    <Card className="p-4 my-2 border-indigo-200 bg-indigo-50 w-full max-w-sm">
        <h4 className="font-bold text-indigo-800">{clinic.name}</h4>
        <p className="text-sm text-indigo-700 font-semibold">{clinic.specialty} ★ {clinic.rating}</p>
        <p className="text-sm text-gray-600 mt-1 italic">"{clinic.quote}"</p>
        <p className="text-xs text-gray-500 mt-2 flex items-start gap-1"><MapPin size={14} className="mt-0.5 shrink-0"/> {clinic.address}</p>
        <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={() => window.open(clinic.website, '_blank')} className="w-full bg-white"><Globe size={14} className="mr-2"/>Website</Button>
            <Button size="sm" variant="outline" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`, '_blank')} className="w-full bg-white"><MapPin size={14} className="mr-2"/>Directions</Button>
        </div>
    </Card>
);


export const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeEmotion, setActiveEmotion] = useState(null);
    const [usedSuggestions, setUsedSuggestions] = useState({});
    const [moodHistory, setMoodHistory] = useState([]);
    const [dailyCheckinQuestion, setDailyCheckinQuestion] = useState("");
    const [currentAffirmation, setCurrentAffirmation] = useState("You are capable of amazing things.");

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    useEffect(() => {
        setDailyCheckinQuestion(dailyCheckinQuestions[Math.floor(Math.random() * dailyCheckinQuestions.length)]);
        setMessages([{ 
            id: Date.now(), 
            text: "Hello! Welcome to your wellness space. How are you feeling today?", 
            sender: 'bot',
            suggestions: ["I'm feeling happy", "I'm feeling sad", "I'm feeling anxious", "Find a local clinic"]
        }]);
    }, []);

    useEffect(scrollToBottom, [messages]);

    const getNextSuggestion = (emotion, type) => {
        const library = botResponses.emotions[emotion].library[type];
        return library[Math.floor(Math.random() * library.length)];
    };

    const detectIntent = (text) => {
        const lowerText = text.toLowerCase();
        for (const emotion in botResponses.emotions) {
            if (lowerText.includes(emotion)) return { type: 'emotion', value: emotion };
        }
        if (['clinic', 'therapist', 'help', 'doctor', 'psychiatrist'].some(s => lowerText.includes(s))) {
            return { type: 'clinic', value: null };
        }
        if (['song', 'book', 'exercise', 'affirmation'].some(s => lowerText.includes(s))) {
            const type = lowerText.includes('song') ? 'songs' : lowerText.includes('book') ? 'books' : lowerText.includes('exercise') ? 'exercises' : 'affirmations';
            return { type: 'request', value: type };
        }
        return { type: 'unknown', value: null };
    };
    
    const addBotMessage = (text, { suggestions = [], clinics = [] } = {}) => {
        setMessages(prev => [...prev, { id: Date.now(), text, sender: 'bot', suggestions, clinics }]);
        setIsTyping(false);
    };

    const handleSendMessage = (textOverride = "") => {
        const text = (textOverride || inputValue).trim();
        if (!text) return;

        setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            const intent = detectIntent(text);
            if (intent.type === 'emotion') {
                const emotion = intent.value;
                setActiveEmotion(emotion);
                if (!moodHistory.includes(emotion)) {
                    setMoodHistory(prev => [...prev, emotion]);
                }
                setCurrentAffirmation(getNextSuggestion(emotion, 'affirmations'));
                
                const ack = botResponses.emotions[emotion].acknowledgement;
                const suggestions = Object.keys(botResponses.emotions[emotion].library).map(s => `Suggest a ${s.slice(0, -1)}`);
                addBotMessage(`${ack} What kind of support would feel best?`, { suggestions });

            } else if (intent.type === 'request' && activeEmotion) {
                const suggestion = getNextSuggestion(activeEmotion, intent.value);
                const suggestions = Object.keys(botResponses.emotions[activeEmotion].library).map(s => `Suggest a ${s.slice(0, -1)}`);
                addBotMessage(`Of course. Here is a suggestion: "${suggestion}". ${botResponses.followUp}`, { suggestions });
            
            } else if (intent.type === 'clinic') {
                const shuffledClinics = [...CLINIC_DATA].sort(() => 0.5 - Math.random());
                const selectedClinics = shuffledClinics.slice(0, 3);
                addBotMessage("It takes courage to seek professional support. Here are a few highly-rated clinics in Mumbai that might be a good fit for you:", { clinics: selectedClinics });

            } else {
                addBotMessage("I'm here to listen. Tell me a bit more about what's on your mind or ask for help finding a clinic.");
            }
        }, 1200);
    };
    
    return (
        <div className="p-4 rounded-lg bg-gray-50 font-sans">
            <header className="text-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Your Wellness Companion</h1>
                <p className="text-gray-500">A safe space to reflect and grow.</p>
            </header>
            
            <Card className="mb-4 p-4 bg-indigo-50 border-indigo-200 animate-fade-in">
                <div className="flex items-center gap-3">
                    <CheckSquare className="text-indigo-600 h-6 w-6"/>
                    <div>
                        <h3 className="font-semibold text-indigo-800">Daily Check-in</h3>
                        <p className="text-sm text-indigo-700">{dailyCheckinQuestion}</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <Card className="h-[600px] flex flex-col">
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, i) => (
                                <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>
                                    <div className={`p-2 rounded-full text-white ${msg.sender === 'user' ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                                        {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                                    </div>
                                    <div className={`flex flex-col gap-1 w-full items-${msg.sender === 'user' ? 'end' : 'start'}`}>
                                        <div className={`p-3 rounded-lg max-w-[85%] ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                        {msg.suggestions?.length > 0 && <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">{msg.suggestions.map(s => <Button key={s} size="sm" variant="outline" onClick={() => handleSendMessage(s)}>{s}</Button>)}</div>}
                                        {msg.clinics?.length > 0 && <div className="flex flex-col gap-2 mt-2 w-full">{msg.clinics.map(c => <ClinicCard key={c.name} clinic={c} />)}</div>}
                                    </div>
                                </div>
                            ))}
                            {isTyping && <div className="text-sm text-gray-500 self-center animate-pulse">Companion is typing...</div>}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t bg-white">
                            <div className="flex gap-2">
                                <Input placeholder="How are you feeling right now?" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} />
                                <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping} variant="hero" size="icon"><Send size={20} /></Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="space-y-4">
                     <Card className="p-4 animate-fade-in">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-700"><Quote size={18} /> Affirmation of the Moment</h3>
                        <p className="text-indigo-700 italic text-center p-2 bg-indigo-50 rounded-lg">"{currentAffirmation}"</p>
                    </Card>
                    <Card className="p-4 animate-fade-in">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-700"><BarChart2 size={18} /> Mood Journey</h3>
                        <div className="flex flex-wrap gap-2">
                            {moodHistory.length > 0 ? moodHistory.map((mood, i) => (
                                <div key={i} className={`px-3 py-1 text-sm text-white rounded-full flex items-center gap-1 animate-fade-in ${moodColors[mood]}`}>
                                    {mood}
                                </div>
                            )) : <p className="text-sm text-gray-500">Your session moods will appear here.</p>}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
