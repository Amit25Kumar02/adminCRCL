import { useState } from "react";
import { Search, Filter, Eye, MapPin, Phone, Mail, Star, Upload, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const businesses = [
  { 
    id: 1, 
    name: "Riyadh Coffee House", 
    category: "Café", 
    location: "Riyadh, King Fahd District",
    contact: "+966 50 111 2222",
    email: "info@riyadhcoffee.sa",
    perksCount: 5,
    rating: 4.8,
    status: "Active",
    joinDate: "2024-11-15"
  },
  { 
    id: 2, 
    name: "Al-Nakheel Restaurant", 
    category: "Restaurant", 
    location: "Jeddah, Al-Hamra District",
    contact: "+966 55 222 3333",
    email: "contact@alnakheel.sa",
    perksCount: 3,
    rating: 4.6,
    status: "Active",
    joinDate: "2024-12-01"
  },
  { 
    id: 3, 
    name: "Desert Gym & Fitness", 
    category: "Fitness", 
    location: "Riyadh, Olaya District",
    contact: "+966 54 333 4444",
    email: "hello@desertgym.sa",
    perksCount: 8,
    rating: 4.9,
    status: "Active",
    joinDate: "2024-10-20"
  },
  { 
    id: 4, 
    name: "Saudi Spa & Wellness", 
    category: "Spa", 
    location: "Riyadh, Al-Malqa District",
    contact: "+966 50 444 5555",
    email: "info@saudispa.sa",
    perksCount: 4,
    rating: 4.7,
    status: "Active",
    joinDate: "2024-11-30"
  },
  { 
    id: 5, 
    name: "Tech Hub Store", 
    category: "Electronics", 
    location: "Jeddah, Red Sea Mall",
    contact: "+966 55 555 6666",
    email: "support@techhub.sa",
    perksCount: 12,
    rating: 4.5,
    status: "Active",
    joinDate: "2024-09-15"
  },
  { 
    id: 6, 
    name: "Fashion District", 
    category: "Retail", 
    location: "Riyadh, Tahlia Street",
    contact: "+966 54 666 7777",
    email: "info@fashiondistrict.sa",
    perksCount: 6,
    rating: 4.4,
    status: "Pending",
    joinDate: "2025-02-28"
  },
];

export function BusinessesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<typeof businesses[0] | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    district: "",
    password: "",
  });

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleRemoveDocument = () => {
    setDocumentFile(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.district || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!documentFile) {
      toast.error("Please upload a document");
      return;
    }

    // In a real application, this would send data to the backend
    console.log("Business Data:", formData);
    console.log("Document:", documentFile);
    
    toast.success("Business added successfully!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      mobile: "",
      district: "",
      password: "",
    });
    setDocumentFile(null);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Businesses Management</h1>
          <p className="text-muted-foreground mt-1">View and manage registered businesses</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add New Business
        </Button>
      </div>

      {/* Add New Business Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-popover border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Business</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter business details to add a new business to the platform
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                placeholder="Enter business name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="business@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="+966 XX XXX XXXX"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Document Upload */}
            <div className="space-y-2">
              <Label htmlFor="document">Document Upload *</Label>
              {!documentFile ? (
                <label 
                  htmlFor="document"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-input hover:bg-muted/80 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      Click to upload document
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, or DOCX (MAX. 10MB)
                    </p>
                  </div>
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 bg-input border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <Upload className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">{documentFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(documentFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveDocument}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* District Field */}
            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="king-fahd">King Fahd District</SelectItem>
                  <SelectItem value="al-hamra">Al-Hamra District</SelectItem>
                  <SelectItem value="olaya">Olaya District</SelectItem>
                  <SelectItem value="al-malqa">Al-Malqa District</SelectItem>
                  <SelectItem value="tahlia">Tahlia Street</SelectItem>
                  <SelectItem value="al-nakheel">Al-Nakheel District</SelectItem>
                  <SelectItem value="al-aziziyah">Al-Aziziyah District</SelectItem>
                  <SelectItem value="al-rawdah">Al-Rawdah District</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add Business
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search businesses by name, category, or location..."
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Business Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Perks</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses
                  .filter(business => 
                    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    business.location.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((business) => (
                    <TableRow 
                      key={business.id} 
                      className="border-border cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedBusiness(business)}
                    >
                      <TableCell>{business.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{business.category}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{business.location}</TableCell>
                      <TableCell className="text-primary">{business.perksCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span>{business.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={business.status === "Active" ? "default" : "secondary"}
                          className={business.status === "Active" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {business.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="border-border">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {businesses.length} of {businesses.length} businesses
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
        
        <div>
          <Card className="p-6 bg-card border-border sticky top-6">
            {selectedBusiness ? (
              <div className="space-y-6">
                <div>
                  <h3>Business Details</h3>
                  <p className="text-sm text-muted-foreground mt-1">Selected business information</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4>{selectedBusiness.name}</h4>
                    <Badge variant="secondary" className="mt-2">{selectedBusiness.category}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="text-sm">{selectedBusiness.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-sm">{selectedBusiness.contact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm">{selectedBusiness.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="text-sm">{selectedBusiness.rating} / 5.0</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">Active Perks</p>
                      <p className="text-primary">{selectedBusiness.perksCount}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Join Date</p>
                      <p className="text-sm">{selectedBusiness.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      View All Perks
                    </Button>
                    <Button variant="outline" className="w-full border-border">
                      Edit Business
                    </Button>
                    <Button variant="outline" className="w-full border-border">
                      Contact Business
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a business to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}