import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Plus, Search, Eye, Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Student {
  id: string;
  studentId: string;
  name: string;
  parentContact: string;
  route: string;
  feeStatus: 'paid' | 'pending';
}

const mockStudents: Student[] = [
  { id: '1', studentId: 'STU-2024-001', name: 'Ahmed Khan', parentContact: '+92 300 1234567', route: 'Route A', feeStatus: 'paid' },
  { id: '2', studentId: 'STU-2024-002', name: 'Maria Shafqat', parentContact: '+92 301 2345678', route: 'Route B', feeStatus: 'paid' },
  { id: '3', studentId: 'STU-2024-003', name: 'Ebad ur Rehman', parentContact: '+92 302 3456789', route: 'Route A', feeStatus: 'pending' },
  { id: '4', studentId: 'STU-2024-004', name: 'Sarah Ali', parentContact: '+92 303 4567890', route: 'Route C', feeStatus: 'paid' },
  { id: '5', studentId: 'STU-2024-005', name: 'Usman Tariq', parentContact: '+92 304 5678901', route: 'Route B', feeStatus: 'pending' },
];

export function StudentManagement() {
  const [students] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl mb-1">Student Management</h1>
          <p className="text-gray-600">Manage student records and attendance</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-slate-800 hover:bg-slate-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Register a new student and assign them to a route
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Student Name</Label>
                <Input id="student-name" placeholder="Enter student name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID</Label>
                <Input id="student-id" placeholder="e.g., STU-2024-006" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-contact">Parent Contact</Label>
                <Input id="parent-contact" placeholder="+92 300 1234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="route">Assign Route</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="route-a">Route A</SelectItem>
                    <SelectItem value="route-b">Route B</SelectItem>
                    <SelectItem value="route-c">Route C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-slate-800 hover:bg-slate-700">
                Add Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name or student ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Database ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Parent Contact</TableHead>
                <TableHead>Assigned Route</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.parentContact}</TableCell>
                  <TableCell>{student.route}</TableCell>
                  <TableCell>
                    <Badge variant={student.feeStatus === 'paid' ? 'default' : 'outline'}
                      className={student.feeStatus === 'paid' ? 'bg-green-600' : 'text-orange-600 border-orange-600'}>
                      {student.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Profile Dialog */}
      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Student Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 text-sm">Student Name</Label>
                  <p className="text-gray-900 mt-1">{selectedStudent.name}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-sm">Student ID</Label>
                  <p className="text-gray-900 mt-1">{selectedStudent.studentId}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-sm">Parent Contact</Label>
                  <p className="text-gray-900 mt-1">{selectedStudent.parentContact}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-sm">Assigned Route</Label>
                  <p className="text-gray-900 mt-1">{selectedStudent.route}</p>
                </div>
              </div>

              {/* Attendance History */}
              <div>
                <h3 className="text-gray-900 mb-3">Recent Attendance</h3>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                      </span>
                      <Badge className="bg-green-600">Present</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code */}
              <div>
                <Button className="w-full" variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print QR Code Card
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
