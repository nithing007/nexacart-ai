import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Search, Sparkles, Wallet, Truck, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-sm border border-green-100">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Your Smart Shopping Partner Powered by <span className="text-green-600">AI</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Personalized recommendations, smart search, and amazing deals - all in one place.
          </p>
          <div className="flex gap-4 pt-2">
            <Button size="lg" className="bg-gray-900 text-white rounded-full px-8">Shop Now</Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-green-700 border-green-200 bg-white hover:bg-green-50">
              <Sparkles className="w-4 h-4 mr-2" /> Explore AI Picks
            </Button>
          </div>
          
          <div className="flex gap-6 pt-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-green-500"/> AI Recommendations</div>
            <div className="flex items-center gap-1.5"><Search className="w-4 h-4 text-green-500"/> Smart Search</div>
            <div className="flex items-center gap-1.5"><Wallet className="w-4 h-4 text-green-500"/> Budget Assistant</div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <div className="relative">
            {/* Placeholder for Hero Image */}
            <div className="w-72 h-72 md:w-96 md:h-96 bg-green-200 rounded-3xl flex items-center justify-center opacity-20">
               Image Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Search className="text-green-600" />, title: "AI-Powered Search", desc: "Search anything in natural language", color: "bg-green-50" },
          { icon: <Sparkles className="text-purple-600" />, title: "Personalized Picks", desc: "Recommendations just for you", color: "bg-purple-50" },
          { icon: <Wallet className="text-orange-600" />, title: "Smart Budgeting", desc: "Stay within budget & save more", color: "bg-orange-50" },
          { icon: <Truck className="text-blue-600" />, title: "Fast Delivery", desc: "Quick & reliable delivery", color: "bg-blue-50" }
        ].map((feat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${feat.color}`}>{feat.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{feat.title}</h3>
                <p className="text-xs text-gray-500">{feat.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      
      {/* AI Picks for You */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-green-500 w-6 h-6" /> AI Picks for You
          </h2>
          <Button variant="link" className="text-green-600 font-semibold">View All</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Sample Product Cards */}
          {[1, 2, 3, 4, 5].map((item) => (
            <Card key={item} className="border-gray-100 hover:border-green-200 hover:shadow-lg transition-all group overflow-hidden">
              <div className="p-4 h-40 bg-gray-50 relative flex items-center justify-center">
                 <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">
                   24% OFF
                 </div>
                 <div className="w-20 h-20 bg-gray-200 rounded-full opacity-50"></div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">Organic Bananas</h3>
                <p className="text-xs text-gray-500 mb-3">1 kg</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900">₹48</span>
                    <span className="text-xs text-gray-400 line-through ml-1">₹63</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                    +
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
