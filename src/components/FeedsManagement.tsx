import { useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, Calendar, MapPin, Image as ImageIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const feeds = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400",
    title: "New Coffee Shop Opens in Riyadh",
    description: "Discover the newest artisan coffee shop featuring premium Saudi beans and traditional Arabian hospitality.",
    dateTime: "2025-03-15 10:00",
    location: "King Fahd District, Riyadh",
    status: "Published",
    publishedDate: "2025-03-01"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
    title: "Weekend Food Festival",
    description: "Join us for a spectacular weekend celebrating Saudi cuisine with local restaurants and food vendors.",
    dateTime: "2025-03-20 16:00",
    location: "Jeddah Waterfront",
    status: "Published",
    publishedDate: "2025-02-28"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
    title: "Fitness Week Special Offers",
    description: "Get fit this month with exclusive gym memberships and wellness packages from our partner fitness centers.",
    dateTime: "2025-03-25 08:00",
    location: "Multiple Locations",
    status: "Scheduled",
    publishedDate: "2025-03-05"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400",
    title: "Tech Hub Grand Opening",
    description: "Experience the future of technology at our newest electronics store featuring the latest gadgets and innovations.",
    dateTime: "2025-04-01 12:00",
    location: "Red Sea Mall, Jeddah",
    status: "Draft",
    publishedDate: null
  },
];

export function FeedsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFeedOpen, setIsAddFeedOpen] = useState(false);
  const [newFeed, setNewFeed] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    imageFile: null as File | null
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFeed({...newFeed, imageFile: e.target.files[0]});
    }
  };

  const handleAddFeed = () => {
    // Mock implementation - in real app, would submit to backend
    console.log("Adding feed:", newFeed);
    setIsAddFeedOpen(false);
    setNewFeed({
      title: "",
      description: "",
      dateTime: "",
      location: "",
      imageFile: null
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Feeds Management</h1>
          <p className="text-muted-foreground mt-1">Manage home screen feeds and announcements</p>
        </div>
        <Dialog open={isAddFeedOpen} onOpenChange={setIsAddFeedOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add New Feed
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Feed</DialogTitle>
              <DialogDescription>
                Add a new feed item for the home screen
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="image">Upload Image</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-muted border-border"
                    />
                  </div>
                  {newFeed.imageFile && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Feed title..."
                  value={newFeed.title}
                  onChange={(e) => setNewFeed({...newFeed, title: e.target.value})}
                  className="bg-muted border-border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Feed description..."
                  value={newFeed.description}
                  onChange={(e) => setNewFeed({...newFeed, description: e.target.value})}
                  className="bg-muted border-border min-h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dateTime">Date & Time</Label>
                  <Input
                    id="dateTime"
                    type="datetime-local"
                    value={newFeed.dateTime}
                    onChange={(e) => setNewFeed({...newFeed, dateTime: e.target.value})}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Riyadh, King Fahd District"
                    value={newFeed.location}
                    onChange={(e) => setNewFeed({...newFeed, location: e.target.value})}
                    className="bg-muted border-border"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFeedOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button onClick={handleAddFeed} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Publish Feed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search feeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>
          <Button variant="outline" className="border-border">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {feeds
          .filter(feed => 
            feed.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feed.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feed.location.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((feed) => (
            <Card key={feed.id} className="bg-card border-border overflow-hidden">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <ImageWithFallback
                  src={feed.image}
                  alt={feed.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3>{feed.title}</h3>
                  <Badge 
                    variant={feed.status === "Published" ? "default" : "secondary"}
                    className={feed.status === "Published" ? "bg-primary text-primary-foreground" : ""}
                  >
                    {feed.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{feed.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{feed.dateTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{feed.location}</span>
                  </div>
                </div>
                {feed.publishedDate && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Published on {feed.publishedDate}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-border">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-border text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {feeds.length} of {feeds.length} feeds
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled className="border-border">
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled className="border-border">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
