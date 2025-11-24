import { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const perks = [
  { 
    id: 1, 
    title: "25% Off All Beverages", 
    business: "Riyadh Coffee House", 
    category: "Food & Drink",
    description: "Get 25% discount on all hot and cold beverages",
    validUntil: "2025-12-31",
    redeemed: 142,
    status: "Active"
  },
  { 
    id: 2, 
    title: "Free Appetizer with Main Course", 
    business: "Al-Nakheel Restaurant", 
    category: "Food & Drink",
    description: "Complimentary appetizer when you order any main course",
    validUntil: "2025-06-30",
    redeemed: 87,
    status: "Active"
  },
  { 
    id: 3, 
    title: "3 Months Free Membership", 
    business: "Desert Gym & Fitness", 
    category: "Fitness",
    description: "Get 3 months of free gym membership for new members",
    validUntil: "2025-04-30",
    redeemed: 234,
    status: "Active"
  },
  { 
    id: 4, 
    title: "50% Off First Spa Treatment", 
    business: "Saudi Spa & Wellness", 
    category: "Wellness",
    description: "Half price on your first spa treatment session",
    validUntil: "2025-12-31",
    redeemed: 98,
    status: "Active"
  },
  { 
    id: 5, 
    title: "Buy 1 Get 1 Free on Accessories", 
    business: "Tech Hub Store", 
    category: "Electronics",
    description: "Purchase any accessory and get another one free",
    validUntil: "2025-03-31",
    redeemed: 156,
    status: "Active"
  },
  { 
    id: 6, 
    title: "20% Off Entire Purchase", 
    business: "Fashion District", 
    category: "Retail",
    description: "Get 20% discount on your entire purchase",
    validUntil: "2025-05-31",
    redeemed: 45,
    status: "Pending"
  },
];

const businesses = [
  "Riyadh Coffee House",
  "Al-Nakheel Restaurant",
  "Desert Gym & Fitness",
  "Saudi Spa & Wellness",
  "Tech Hub Store",
  "Fashion District"
];

export function PerksManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPerkOpen, setIsAddPerkOpen] = useState(false);
  const [newPerk, setNewPerk] = useState({
    title: "",
    business: "",
    category: "",
    description: "",
    validUntil: ""
  });

  const handleAddPerk = () => {
    // Mock implementation - in real app, would submit to backend
    console.log("Adding perk:", newPerk);
    setIsAddPerkOpen(false);
    setNewPerk({
      title: "",
      business: "",
      category: "",
      description: "",
      validUntil: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Perks Management</h1>
          <p className="text-muted-foreground mt-1">Manage and create perks for businesses</p>
        </div>
        <Dialog open={isAddPerkOpen} onOpenChange={setIsAddPerkOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add New Perk
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Perk</DialogTitle>
              <DialogDescription>
                Create a new perk on behalf of a business
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="business">Select Business</Label>
                <Select value={newPerk.business} onValueChange={(value) => setNewPerk({...newPerk, business: value})}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Choose a business" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {businesses.map((business) => (
                      <SelectItem key={business} value={business}>
                        {business}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Perk Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., 25% Off All Items"
                  value={newPerk.title}
                  onChange={(e) => setNewPerk({...newPerk, title: e.target.value})}
                  className="bg-muted border-border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newPerk.category} onValueChange={(value) => setNewPerk({...newPerk, category: value})}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="food">Food & Drink</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="wellness">Wellness</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the perk details..."
                  value={newPerk.description}
                  onChange={(e) => setNewPerk({...newPerk, description: e.target.value})}
                  className="bg-muted border-border min-h-24"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validUntil">Valid Until</Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={newPerk.validUntil}
                  onChange={(e) => setNewPerk({...newPerk, validUntil: e.target.value})}
                  className="bg-muted border-border"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPerkOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button onClick={handleAddPerk} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Create Perk
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
              placeholder="Search perks by title, business, or category..."
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
      
      <Card className="bg-card border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Perk Title</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Redeemed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perks
              .filter(perk => 
                perk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                perk.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
                perk.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((perk) => (
                <TableRow key={perk.id} className="border-border">
                  <TableCell>
                    <div>
                      <p>{perk.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{perk.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{perk.business}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{perk.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{perk.validUntil}</TableCell>
                  <TableCell className="text-primary">{perk.redeemed}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={perk.status === "Active" ? "default" : "secondary"}
                      className={perk.status === "Active" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {perk.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="border-border">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-border">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-border text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {perks.length} of {perks.length} perks
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
