import { useState } from "react";
import { Search, Filter, Check, X, Eye, Mail } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const registeredUsers = [
  { id: 1, name: "Ahmed Al-Rashid", email: "ahmed.r@email.com", phone: "+966 50 123 4567", joinDate: "2025-01-15", status: "Active" },
  { id: 2, name: "Sarah Al-Mutairi", email: "sarah.m@email.com", phone: "+966 55 234 5678", joinDate: "2025-01-18", status: "Active" },
  { id: 3, name: "Mohammed Al-Qahtani", email: "mohammed.q@email.com", phone: "+966 54 345 6789", joinDate: "2025-01-20", status: "Active" },
  { id: 4, name: "Noura Al-Dosari", email: "noura.d@email.com", phone: "+966 50 456 7890", joinDate: "2025-01-22", status: "Active" },
  { id: 5, name: "Khalid Al-Shahrani", email: "khalid.s@email.com", phone: "+966 55 567 8901", joinDate: "2025-01-25", status: "Active" },
  { id: 6, name: "Lama Al-Ghamdi", email: "lama.g@email.com", phone: "+966 54 678 9012", joinDate: "2025-01-28", status: "Inactive" },
  { id: 7, name: "Faisal Al-Harbi", email: "faisal.h@email.com", phone: "+966 50 789 0123", joinDate: "2025-02-01", status: "Active" },
  { id: 8, name: "Reem Al-Shammari", email: "reem.s@email.com", phone: "+966 55 890 1234", joinDate: "2025-02-03", status: "Active" },
];

const awaitingApprovalUsers = [
  { id: 9, name: "Fatima Al-Otaibi", email: "fatima.o@email.com", phone: "+966 50 901 2345", appliedDate: "2025-02-28", reason: "New Registration" },
  { id: 10, name: "Abdullah Al-Zahrani", email: "abdullah.z@email.com", phone: "+966 55 012 3456", appliedDate: "2025-03-01", reason: "New Registration" },
  { id: 11, name: "Maha Al-Anazi", email: "maha.a@email.com", phone: "+966 54 123 4567", appliedDate: "2025-03-02", reason: "Account Reactivation" },
  { id: 12, name: "Saud Al-Malki", email: "saud.m@email.com", phone: "+966 50 234 5678", appliedDate: "2025-03-02", reason: "New Registration" },
];

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("registered");

  return (
    <div className="space-y-6">
      <div>
        <h1>Users Management</h1>
        <p className="text-muted-foreground mt-1">Manage registered users and approval requests</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="registered">Registered Users</TabsTrigger>
          <TabsTrigger value="awaiting">
            Awaiting Approval
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {awaitingApprovalUsers.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="registered" className="mt-6 space-y-4">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or phone..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registeredUsers
                  .filter(user => 
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.phone.includes(searchTerm)
                  )
                  .map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell>{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                      <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.status === "Active" ? "default" : "secondary"}
                          className={user.status === "Active" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="border-border">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="border-border">
                            <Mail className="w-4 h-4 mr-1" />
                            Contact
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
              Showing {registeredUsers.length} of {registeredUsers.length} users
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
        </TabsContent>
        
        <TabsContent value="awaiting" className="mt-6 space-y-4">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search pending users..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {awaitingApprovalUsers.map((user) => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{user.appliedDate}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.reason}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="border-border text-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
