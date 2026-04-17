'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Image, MapPin, DollarSign, Package, Music, Trophy, 
  Utensils, Lightbulb, X, Download, ChevronLeft, ChevronRight,
  Calendar, Users, Navigation as NavIcon, Plus, Trash2, Check,
  Award, TrendingUp, PieChart, Edit, Clock, Upload, Play,
  ChevronDown, ExternalLink, Heart, Star, Zap, Target
} from 'lucide-react';
import * as THREE from 'three';

// ============================================================================
// 3D COMPONENTS
// ============================================================================

function FloatingBeachScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} scale={2}>
          <MeshDistortMaterial
            color="#00D9FF"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere args={[0.5, 32, 32]} position={[3, 1, -2]} scale={1.5}>
          <MeshDistortMaterial
            color="#FF6B6B"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.3}
            metalness={0.6}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[0.3, 32, 32]} position={[-2.5, -1, -1]} scale={1.2}>
          <MeshDistortMaterial
            color="#FFD93D"
            attach="material"
            distort={0.5}
            speed={1.8}
            roughness={0.4}
            metalness={0.5}
          />
        </Sphere>
      </Float>
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF6B6B" />
      <FloatingBeachScene />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface DriveImage {
  id: string;
  name: string;
  thumbnailUrl: string;
  downloadUrl: string;
  uploadedAt: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  category: string;
  date: string;
}

interface PackingItem {
  id: string;
  item: string;
  category: string;
  assignedTo?: string;
  isPacked: boolean;
}

interface Achievement {
  id: string;
  badge: string;
  title: string;
  description: string;
  earnedBy?: string;
  locked: boolean;
  icon: any;
}

const TRIP_INFO = {
  startDate: new Date('2025-04-30T20:00:00'),
  endDate: new Date('2025-05-03T23:59:59'),
  totalFriends: 10,
  totalDistance: 369,
  logo: 'GangForever',
};

const DESTINATIONS = [
  { name: 'Snehatheeram, Kerala', order: 1, emoji: '🌊', activity: 'Beach vibes & sunset' },
  { name: 'Guruvayur, Kerala', order: 2, emoji: '🛕', activity: 'Temple visit' },
  { name: 'Chinese Fishing Nets, Fort Kochi', order: 3, emoji: '🎣', activity: 'Historic fishing nets' },
  { name: 'Cherai Beach, Vypin', order: 4, emoji: '🏖️', activity: 'Golden sands' },
  { name: 'Alappuzha Beach', order: 5, emoji: '⛱️', activity: 'Backwaters & beach' },
  { name: 'Munroe Island', order: 6, emoji: '🚤', activity: 'Canoe ride' },
  { name: 'Kollam Beach', order: 7, emoji: '🌅', activity: 'Coastal beauty' },
  { name: 'Varkala', order: 8, emoji: '🏄', activity: 'Cliff beach & water sports' },
];

const KERALA_FOODS = [
  { name: 'Kerala Sadya', description: 'Traditional feast on banana leaf', emoji: '🍛', mustTry: true },
  { name: 'Appam & Stew', description: 'Soft pancakes with coconut curry', emoji: '🥞', mustTry: true },
  { name: 'Karimeen Pollichathu', description: 'Pearl spot fish in banana leaf', emoji: '🐟', mustTry: true },
  { name: 'Puttu & Kadala', description: 'Steamed rice cake with chickpea curry', emoji: '🍚', mustTry: false },
  { name: 'Beef Fry', description: 'Spicy Kerala-style beef', emoji: '🍖', mustTry: false },
  { name: 'Pazham Pori', description: 'Banana fritters', emoji: '🍌', mustTry: false },
];

const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: '1', badge: 'Early Bird', title: 'First to Pack', description: 'Packed everything before others', locked: true, icon: Package },
  { id: '2', badge: 'Photographer', title: 'Photo Master', description: 'Uploaded 50+ photos', locked: true, icon: Image },
  { id: '3', badge: 'Navigator', title: 'Road Captain', description: 'Led the way without GPS', locked: true, icon: NavIcon },
  { id: '4', badge: 'Foodie', title: 'Taste Explorer', description: 'Tried all Kerala dishes', locked: true, icon: Utensils },
  { id: '5', badge: 'Party Starter', title: 'Vibe Keeper', description: 'Best playlist contributor', locked: true, icon: Music },
  { id: '6', badge: 'Budget Master', title: 'Money Manager', description: 'Tracked all expenses', locked: true, icon: DollarSign },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [tripStarted, setTripStarted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const start = TRIP_INFO.startDate.getTime();
      const end = TRIP_INFO.endDate.getTime();

      if (now >= start && now <= end) {
        setTripStarted(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      if (now > end) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const difference = start - now;
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (tripStarted) {
    return (
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl font-bold text-accent-gold"
        >
          🎉 Trip in Progress! 🎉
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map((unit, idx) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-accent-cyan/20 rounded-lg blur-xl group-hover:bg-accent-cyan/30 transition-all" />
            <div className="relative bg-gradient-to-br from-bg-secondary to-bg-primary border border-accent-cyan/30 rounded-lg p-6 min-w-[100px] backdrop-blur-sm">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent-cyan to-accent-coral bg-clip-text text-transparent font-mono">
                {String(unit.value).padStart(2, '0')}
              </div>
            </div>
          </div>
          <div className="text-text-secondary text-sm mt-2 uppercase tracking-wider font-semibold">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ImageLightbox({ 
  images, 
  initialIndex, 
  onClose 
}: { 
  images: DriveImage[]; 
  initialIndex: number; 
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setCurrentIndex(i => Math.min(images.length - 1, i + 1));
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose, images.length]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex].downloadUrl;
    link.download = images[currentIndex].name;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110">
        <X className="w-6 h-6 text-white" />
      </button>

      <button onClick={handleDownload} className="absolute top-4 right-20 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110">
        <Download className="w-6 h-6 text-white" />
      </button>

      <div className="absolute top-4 left-4 z-50 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold">
        {currentIndex + 1} / {images.length}
      </div>

      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        src={images[currentIndex].downloadUrl || images[currentIndex].thumbnailUrl}
        alt={images[currentIndex].name}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
      />

      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-white text-sm max-w-md truncate">
        {images[currentIndex].name}
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function GangForeverComplete() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Gallery state
  const [groupedImages, setGroupedImages] = useState<{ [day: string]: DriveImage[] }>({});
  const [selectedDay, setSelectedDay] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryLoading, setGalleryLoading] = useState(true);

  // Budget state
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    category: 'Food',
  });

  // Packing state
  const [packingItems, setPackingItems] = useState<PackingItem[]>([
    { id: '1', item: 'Sunscreen', category: 'Personal', isPacked: false },
    { id: '2', item: 'Swimwear', category: 'Personal', isPacked: false },
    { id: '3', item: 'Camera', category: 'Shared', assignedTo: 'Someone', isPacked: false },
    { id: '4', item: 'Portable Speaker', category: 'Shared', assignedTo: 'Someone', isPacked: false },
  ]);
  const [newItem, setNewItem] = useState('');

  // Achievements state
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_DATA);

  // Fetch gallery images
  useEffect(() => {
    if (currentPage === 'gallery') {
      fetchImages();
    }
  }, [currentPage]);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      if (data.photos && Object.keys(data.photos).length > 0) {
        setGroupedImages(data.photos);
      } else {
        // Mock data fallback
        setGroupedImages({
          'Apr 30': [
            { id: '1', name: 'Trip Start.jpg', thumbnailUrl: 'https://picsum.photos/400/400?random=1', downloadUrl: 'https://picsum.photos/1200/1200?random=1', uploadedAt: new Date().toISOString() },
            { id: '2', name: 'Snehatheeram Beach.jpg', thumbnailUrl: 'https://picsum.photos/400/400?random=2', downloadUrl: 'https://picsum.photos/1200/1200?random=2', uploadedAt: new Date().toISOString() },
          ],
          'May 1': [
            { id: '3', name: 'Guruvayur Temple.jpg', thumbnailUrl: 'https://picsum.photos/400/400?random=3', downloadUrl: 'https://picsum.photos/1200/1200?random=3', uploadedAt: new Date().toISOString() },
            { id: '4', name: 'Fort Kochi.jpg', thumbnailUrl: 'https://picsum.photos/400/400?random=4', downloadUrl: 'https://picsum.photos/1200/1200?random=4', uploadedAt: new Date().toISOString() },
          ],
        });
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setGalleryLoading(false);
    }
  };

  const days = Object.keys(groupedImages).sort();
  const displayImages = selectedDay === 'all' 
    ? Object.values(groupedImages).flat()
    : groupedImages[selectedDay] || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Budget functions
  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.paidBy) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        paidBy: newExpense.paidBy,
        splitAmong: Array(TRIP_INFO.totalFriends).fill('Friend'),
        category: newExpense.category,
        date: new Date().toISOString(),
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ description: '', amount: '', paidBy: '', category: 'Food' });
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPerson = totalExpense / TRIP_INFO.totalFriends;

  // Packing functions
  const addPackingItem = () => {
    if (newItem.trim()) {
      setPackingItems([...packingItems, {
        id: Date.now().toString(),
        item: newItem,
        category: 'Personal',
        isPacked: false,
      }]);
      setNewItem('');
    }
  };

  const togglePacked = (id: string) => {
    setPackingItems(packingItems.map(item => 
      item.id === id ? { ...item, isPacked: !item.isPacked } : item
    ));
  };

  const deletePackingItem = (id: string) => {
    setPackingItems(packingItems.filter(item => item.id !== id));
  };

  const packedCount = packingItems.filter(i => i.isPacked).length;
  const packingProgress = (packedCount / packingItems.length) * 100;

  // Navigation
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'itinerary', label: 'Itinerary', icon: MapPin },
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'packing', label: 'Packing', icon: Package },
    { id: 'playlist', label: 'Playlist', icon: Music },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'tips', label: 'Tips', icon: Lightbulb },
  ];

  // ============================================================================
  // PAGE RENDERERS
  // ============================================================================

  const renderHome = () => (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <div className="absolute inset-0 h-screen">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo */}
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-8xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-accent-cyan via-accent-coral to-accent-gold bg-clip-text text-transparent leading-tight"
          >
            GangForever
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl text-text-secondary mb-12 font-light"
          >
            Varkala Trip 2025
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-xl text-text-secondary mb-8 uppercase tracking-widest font-semibold">
              Countdown to Adventure
            </h2>
            <CountdownTimer />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          >
            {[
              { icon: Users, value: TRIP_INFO.totalFriends, label: 'Friends', color: 'accent-cyan' },
              { icon: MapPin, value: DESTINATIONS.length, label: 'Destinations', color: 'accent-coral' },
              { icon: Calendar, value: 4, label: 'Days', color: 'accent-gold' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-${stat.color}/10 rounded-2xl blur-xl group-hover:bg-${stat.color}/20 transition-all`} />
                <div className="relative bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <stat.icon className={`w-12 h-12 text-${stat.color} mx-auto mb-4`} />
                  <div className={`text-5xl font-bold text-${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-text-secondary text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('gallery')}
              className="px-8 py-4 bg-gradient-to-r from-accent-cyan to-blue-500 text-white font-bold rounded-full shadow-xl shadow-accent-cyan/30 hover:shadow-accent-cyan/50 transition-all"
            >
              View Gallery
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('itinerary')}
              className="px-8 py-4 bg-bg-secondary/80 backdrop-blur-sm border-2 border-accent-cyan/50 text-accent-cyan font-bold rounded-full hover:bg-accent-cyan/10 transition-all"
            >
              See Itinerary
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-text-secondary" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-cyan to-accent-coral bg-clip-text text-transparent mb-4">
            Gallery
          </h1>
          <p className="text-text-secondary text-xl">
            {displayImages.length} memories captured
          </p>
        </motion.div>

        {/* Day Filter */}
        <div className="mb-8 flex gap-3 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDay('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedDay === 'all'
                ? 'bg-accent-cyan text-bg-primary shadow-lg shadow-accent-cyan/50'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/70 border border-white/10'
            }`}
          >
            All Days
          </motion.button>
          {days.map((day) => (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedDay === day
                  ? 'bg-accent-cyan text-bg-primary shadow-lg shadow-accent-cyan/50'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/70 border border-white/10'
              }`}
            >
              {day} ({groupedImages[day]?.length || 0})
            </motion.button>
          ))}
        </div>

        {/* Image Grid */}
        {galleryLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-16 h-16 border-4 border-accent-cyan border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {displayImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-bg-secondary cursor-pointer border border-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-coral/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img
                  src={image.thumbnailUrl}
                  alt={image.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <Download className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <ImageLightbox
              images={displayImages}
              initialIndex={lightboxIndex}
              onClose={() => setLightboxOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const renderItinerary = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-coral to-accent-gold bg-clip-text text-transparent mb-4">
            Itinerary
          </h1>
          <p className="text-text-secondary text-xl">
            {DESTINATIONS.length} incredible stops across Kerala
          </p>
        </motion.div>

        <div className="space-y-6">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.order}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-coral/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-accent-cyan/30 transition-all">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{dest.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-accent-cyan/20 border border-accent-cyan flex items-center justify-center font-bold text-accent-cyan">
                        {dest.order}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                    </div>
                    <p className="text-text-secondary text-lg">{dest.activity}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-text-secondary group-hover:text-accent-cyan transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-8 bg-gradient-to-r from-accent-cyan/10 to-accent-coral/10 rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <NavIcon className="w-8 h-8 text-accent-cyan" />
            <h3 className="text-2xl font-bold text-white">Route Info</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <span className="text-text-secondary">Total Distance:</span>
              <span className="ml-2 text-accent-cyan font-bold">{TRIP_INFO.totalDistance} km</span>
            </div>
            <div>
              <span className="text-text-secondary">Est. Travel Time:</span>
              <span className="ml-2 text-accent-gold font-bold">~10 hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderBudget = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-gold to-accent-coral bg-clip-text text-transparent mb-4">
            Budget Tracker
          </h1>
          <p className="text-text-secondary text-xl">
            Track expenses and split costs
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 rounded-2xl border border-accent-gold/30"
          >
            <DollarSign className="w-12 h-12 text-accent-gold mb-4" />
            <div className="text-4xl font-bold text-accent-gold mb-2">₹{totalExpense.toFixed(0)}</div>
            <div className="text-text-secondary">Total Expense</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/5 rounded-2xl border border-accent-cyan/30"
          >
            <TrendingUp className="w-12 h-12 text-accent-cyan mb-4" />
            <div className="text-4xl font-bold text-accent-cyan mb-2">₹{perPerson.toFixed(0)}</div>
            <div className="text-text-secondary">Per Person</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gradient-to-br from-accent-coral/20 to-accent-coral/5 rounded-2xl border border-accent-coral/30"
          >
            <PieChart className="w-12 h-12 text-accent-coral mb-4" />
            <div className="text-4xl font-bold text-accent-coral mb-2">{expenses.length}</div>
            <div className="text-text-secondary">Transactions</div>
          </motion.div>
        </div>

        {/* Add Expense Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 p-8 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Plus className="w-6 h-6 text-accent-cyan" />
            Add Expense
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="px-4 py-3 bg-bg-primary/50 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:border-accent-cyan focus:outline-none"
            />
            <input
              type="number"
              placeholder="Amount (₹)"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="px-4 py-3 bg-bg-primary/50 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:border-accent-cyan focus:outline-none"
            />
            <input
              type="text"
              placeholder="Paid by"
              value={newExpense.paidBy}
              onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
              className="px-4 py-3 bg-bg-primary/50 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:border-accent-cyan focus:outline-none"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="px-4 py-3 bg-bg-primary/50 border border-white/10 rounded-lg text-white focus:border-accent-cyan focus:outline-none"
            >
              <option>Food</option>
              <option>Stay</option>
              <option>Activity</option>
              <option>Transport</option>
              <option>Other</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addExpense}
            className="mt-4 px-8 py-3 bg-accent-cyan text-bg-primary font-bold rounded-lg hover:bg-accent-cyan/90 transition-all"
          >
            Add Expense
          </motion.button>
        </motion.div>

        {/* Expense List */}
        <div className="space-y-4">
          {expenses.map((expense, idx) => (
            <motion.div
              key={expense.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-between group hover:border-accent-cyan/30 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan text-sm rounded-full font-semibold">
                    {expense.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{expense.description}</h3>
                </div>
                <p className="text-text-secondary">Paid by {expense.paidBy}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-3xl font-bold text-accent-gold">₹{expense.amount}</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteExpense(expense.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </motion.button>
              </div>
            </motion.div>
          ))}

          {expenses.length === 0 && (
            <div className="text-center py-16 text-text-secondary">
              <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">No expenses added yet</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderPacking = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-cyan to-accent-gold bg-clip-text text-transparent mb-4">
            Packing List
          </h1>
          <p className="text-text-secondary text-xl">
            {packedCount} / {packingItems.length} items packed
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="mb-12 p-8 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg text-text-secondary">Progress</span>
            <span className="text-2xl font-bold text-accent-cyan">{packingProgress.toFixed(0)}%</span>
          </div>
          <div className="h-4 bg-bg-primary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${packingProgress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-accent-cyan to-accent-gold"
            />
          </div>
        </motion.div>

        {/* Add Item */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 p-6 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Add item to pack..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPackingItem()}
              className="flex-1 px-4 py-3 bg-bg-primary/50 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:border-accent-cyan focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addPackingItem}
              className="px-6 py-3 bg-accent-cyan text-bg-primary font-bold rounded-lg hover:bg-accent-cyan/90 transition-all"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Packing Items */}
        <div className="space-y-3">
          {packingItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className={`p-4 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-xl border transition-all ${
                item.isPacked 
                  ? 'border-accent-cyan/50 bg-accent-cyan/5' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => togglePacked(item.id)}
                  className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                    item.isPacked
                      ? 'bg-accent-cyan border-accent-cyan'
                      : 'border-white/30 hover:border-accent-cyan'
                  }`}
                >
                  {item.isPacked && <Check className="w-5 h-5 text-bg-primary" />}
                </motion.button>

                <div className="flex-1">
                  <div className={`text-lg font-semibold transition-all ${
                    item.isPacked ? 'text-text-secondary line-through' : 'text-white'
                  }`}>
                    {item.item}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {item.category} {item.assignedTo && `• Assigned to ${item.assignedTo}`}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deletePackingItem(item.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {packingProgress === 100 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-12 p-8 bg-gradient-to-r from-accent-cyan/20 to-accent-gold/20 rounded-2xl border border-accent-cyan/50 text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-white mb-2">All Packed!</h3>
            <p className="text-text-secondary">Ready for the adventure!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const renderPlaylist = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-coral to-accent-gold bg-clip-text text-transparent mb-4">
            Road Trip Playlist
          </h1>
          <p className="text-text-secondary text-xl">
            Curated vibes for the journey
          </p>
        </motion.div>

        {/* Spotify Embed Placeholder */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 p-12 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-2xl border border-white/10 text-center"
        >
          <Music className="w-24 h-24 text-accent-coral mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">Spotify Playlist</h3>
          <p className="text-text-secondary mb-8 text-lg">
            Embed your Spotify playlist here using the iframe code
          </p>
          <div className="p-8 bg-bg-primary/50 rounded-xl border border-white/5">
            <code className="text-sm text-text-secondary">
              &lt;iframe src="spotify-playlist-url" width="100%" height="380"&gt;&lt;/iframe&gt;
            </code>
          </div>
        </motion.div>

        {/* Song Suggestions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-8 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-accent-gold" />
            Suggested Vibes
          </h3>
          <div className="space-y-4">
            {['Road trip classics', 'Kerala folk fusion', 'Beach sunset chill', 'High energy bangers'].map((vibe, idx) => (
              <motion.div
                key={vibe}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="p-4 bg-bg-primary/50 rounded-xl border border-white/5 hover:border-accent-coral/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-coral/20 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-accent-coral" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{vibe}</div>
                    <div className="text-sm text-text-secondary">Mix • {Math.floor(Math.random() * 30 + 20)} songs</div>
                  </div>
                  <Heart className="w-5 h-5 text-text-secondary hover:text-accent-coral transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderFood = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-gold to-accent-coral bg-clip-text text-transparent mb-4">
            Kerala Cuisine
          </h1>
          <p className="text-text-secondary text-xl">
            Must-try dishes on our journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KERALA_FOODS.map((food, idx) => (
            <motion.div
              key={food.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-accent-coral/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative p-8 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-accent-gold/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{food.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">{food.name}</h3>
                      {food.mustTry && (
                        <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold text-sm rounded-full font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Must Try
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-lg">{food.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 bg-gradient-to-r from-accent-gold/10 to-accent-coral/10 rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <Utensils className="w-8 h-8 text-accent-gold" />
            <h3 className="text-2xl font-bold text-white">Pro Tips</h3>
          </div>
          <ul className="space-y-3 text-lg text-text-secondary">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-accent-cyan mt-1 flex-shrink-0" />
              <span>Try local beach shacks for authentic flavors</span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-accent-cyan mt-1 flex-shrink-0" />
              <span>Ask for "Kerala style" preparation for best experience</span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-accent-cyan mt-1 flex-shrink-0" />
              <span>Budget ₹300-500 per meal per person</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderAchievements = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-gold to-accent-cyan bg-clip-text text-transparent mb-4">
            Achievements
          </h1>
          <p className="text-text-secondary text-xl">
            Unlock badges throughout the trip
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-2xl blur-xl transition-all ${
                  achievement.locked 
                    ? 'bg-white/5' 
                    : 'bg-gradient-to-br from-accent-gold/30 to-accent-cyan/30'
                }`} />
                <div className={`relative p-8 rounded-2xl border backdrop-blur-xl transition-all ${
                  achievement.locked
                    ? 'bg-bg-secondary/50 border-white/10 grayscale'
                    : 'bg-gradient-to-br from-accent-gold/10 to-accent-cyan/10 border-accent-gold/30'
                }`}>
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all ${
                    achievement.locked
                      ? 'bg-white/5'
                      : 'bg-gradient-to-br from-accent-gold/30 to-accent-cyan/30'
                  }`}>
                    <Icon className={`w-10 h-10 ${achievement.locked ? 'text-text-secondary' : 'text-accent-gold'}`} />
                  </div>

                  <div className="text-center">
                    <h3 className={`text-2xl font-bold mb-2 ${achievement.locked ? 'text-text-secondary' : 'text-white'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-text-secondary mb-4">{achievement.description}</p>
                    
                    {achievement.locked ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-text-secondary text-sm">
                        <Award className="w-4 h-4" />
                        Locked
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/20 rounded-full text-accent-gold text-sm font-semibold">
                        <Check className="w-4 h-4" />
                        Unlocked
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  const renderTips = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 pt-24"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-cyan to-accent-coral bg-clip-text text-transparent mb-4">
            Travel Tips
          </h1>
          <p className="text-text-secondary text-xl">
            Essential info for a smooth trip
          </p>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              icon: Clock,
              title: 'Best Time to Visit',
              description: 'Early mornings for beaches, avoid midday heat. Sunset at Varkala cliffs is unmissable.',
              color: 'accent-cyan',
            },
            {
              icon: DollarSign,
              title: 'Budget Wisely',
              description: 'Carry cash for local vendors. Budget ₹2000-3000 per person per day including food, activities.',
              color: 'accent-gold',
            },
            {
              icon: Package,
              title: 'Pack Smart',
              description: 'Light cotton clothes, sunscreen SPF 50+, power bank, waterproof bag for beach items.',
              color: 'accent-coral',
            },
            {
              icon: Utensils,
              title: 'Food Safety',
              description: 'Stick to popular restaurants, drink bottled water only, avoid street food if sensitive stomach.',
              color: 'accent-cyan',
            },
            {
              icon: NavIcon,
              title: 'Navigation',
              description: 'Download offline maps. Roads are good but some stretches have poor network coverage.',
              color: 'accent-gold',
            },
            {
              icon: Heart,
              title: 'Stay Safe',
              description: 'Share live location with family. Keep emergency contacts handy. Avoid swimming in rough seas.',
              color: 'accent-coral',
            },
          ].map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.title}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-${tip.color}/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                <div className="relative p-8 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-white/20 transition-all">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-${tip.color}/20 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-8 h-8 text-${tip.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{tip.title}</h3>
                      <p className="text-text-secondary text-lg leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 bg-gradient-to-r from-accent-gold/10 to-accent-cyan/10 rounded-2xl border border-accent-gold/30"
        >
          <div className="text-center">
            <Lightbulb className="w-16 h-16 text-accent-gold mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4">Emergency Contacts</h3>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div>
                <div className="text-text-secondary">Police</div>
                <div className="text-accent-cyan font-bold">100</div>
              </div>
              <div>
                <div className="text-text-secondary">Ambulance</div>
                <div className="text-accent-coral font-bold">108</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // ============================================================================
  // RENDER MAIN APP
  // ============================================================================

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'gallery': return renderGallery();
      case 'itinerary': return renderItinerary();
      case 'budget': return renderBudget();
      case 'packing': return renderPacking();
      case 'playlist': return renderPlaylist();
      case 'food': return renderFood();
      case 'achievements': return renderAchievements();
      case 'tips': return renderTips();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentPage('home')}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-coral bg-clip-text text-transparent"
            >
              GangForever
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-accent-cyan to-accent-coral text-white shadow-lg'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="w-6 h-0.5 bg-white mb-1.5" />
              <div className="w-6 h-0.5 bg-white mb-1.5" />
              <div className="w-6 h-0.5 bg-white" />
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-4 overflow-hidden"
              >
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-accent-cyan to-accent-coral text-white'
                            : 'text-text-secondary hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 mt-24 py-12 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-accent-cyan via-accent-coral to-accent-gold bg-clip-text text-transparent mb-4">
            GangForever
          </div>
          <p className="text-text-secondary mb-6">
            April 30 - May 3, 2025 • Kerala, India
          </p>
          <div className="flex justify-center gap-6 text-text-secondary">
            <span>{TRIP_INFO.totalFriends} Friends</span>
            <span>•</span>
            <span>{DESTINATIONS.length} Destinations</span>
            <span>•</span>
            <span>{TRIP_INFO.totalDistance}km Journey</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
