import React, { useState, useMemo } from 'react';
import { Search, Upload, Users, Mail, Phone, Building, UserCheck, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Contact {
  name: string;
  department: string;
  email: string;
  phone: string;
  role: string;
  profilePicture: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([
    { name: 'Sarah Johnson', department: 'Engineering', email: 'sarah.johnson@company.com', phone: '(555) 123-4567', role: 'Senior Software Engineer', profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Michael Chen', department: 'Marketing', email: 'michael.chen@company.com', phone: '(555) 234-5678', role: 'Marketing Manager', profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Emily Rodriguez', department: 'Sales', email: 'emily.rodriguez@company.com', phone: '(555) 345-6789', role: 'Sales Representative', profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'David Thompson', department: 'HR', email: 'david.thompson@company.com', phone: '(555) 456-7890', role: 'HR Specialist', profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Jessica Wang', department: 'Finance', email: 'jessica.wang@company.com', phone: '(555) 567-8901', role: 'Financial Analyst', profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Michael Roberts', department: 'Engineering', email: 'michael.roberts@company.com', phone: '(555) 678-9012', role: 'DevOps Engineer', profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Amanda Davis', department: 'Operations', email: 'amanda.davis@company.com', phone: '(555) 789-0123', role: 'Operations Manager', profilePicture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Christopher Lee', department: 'Marketing', email: 'christopher.lee@company.com', phone: '(555) 890-1234', role: 'Content Strategist', profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Sarah Brown', department: 'Sales', email: 'sarah.brown@company.com', phone: '(555) 901-2345', role: 'Account Executive', profilePicture: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Kevin Wilson', department: 'Engineering', email: 'kevin.wilson@company.com', phone: '(555) 012-3456', role: 'Frontend Developer', profilePicture: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Rachel Green', department: 'HR', email: 'rachel.green@company.com', phone: '(555) 123-4568', role: 'Recruiter', profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'David Martinez', department: 'Finance', email: 'david.martinez@company.com', phone: '(555) 234-5679', role: 'Senior Accountant', profilePicture: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Ashley Taylor', department: 'Marketing', email: 'ashley.taylor@company.com', phone: '(555) 345-6780', role: 'Social Media Manager', profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'James Anderson', department: 'Operations', email: 'james.anderson@company.com', phone: '(555) 456-7891', role: 'Supply Chain Analyst', profilePicture: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Nicole White', department: 'Engineering', email: 'nicole.white@company.com', phone: '(555) 567-8902', role: 'Backend Developer', profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Michael Clark', department: 'Sales', email: 'michael.clark@company.com', phone: '(555) 678-9013', role: 'Sales Manager', profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Stephanie Lewis', department: 'HR', email: 'stephanie.lewis@company.com', phone: '(555) 789-0124', role: 'HR Director', profilePicture: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Ryan Hall', department: 'Finance', email: 'ryan.hall@company.com', phone: '(555) 890-1235', role: 'Budget Analyst', profilePicture: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Sarah Young', department: 'Marketing', email: 'sarah.young@company.com', phone: '(555) 901-2346', role: 'Brand Manager', profilePicture: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { name: 'Tyler King', department: 'Operations', email: 'tyler.king@company.com', phone: '(555) 012-3457', role: 'Project Coordinator', profilePicture: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(true);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const parsedContacts: Contact[] = jsonData.map((row) => ({
          name: row.Name || row.name || '',
          department: row.Department || row.department || '',
          email: row.Email || row.email || '',
          phone: row.Phone || row.phone || '',
          role: row.Role || row.role || '',
          profilePicture: row.ProfilePicture || row.profilePicture || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        }));

        setContacts(parsedContacts);
        setIsFileUploaded(true);
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const filteredContacts = useMemo(() => {
    if (!searchTerm) return [];
    
    return contacts.filter((contact) =>
      Object.values(contact).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [contacts, searchTerm]);

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-green-100 text-green-800',
      'Sales': 'bg-purple-100 text-purple-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Operations': 'bg-indigo-100 text-indigo-800',
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Company Phonebook</h1>
          </div>
          <p className="text-gray-600 text-lg">Search and find your colleagues instantly</p>
        </div>

        {/* File Upload Section */}
        {!isFileUploaded && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors">
              <div className="text-center">
                <FileSpreadsheet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Your Excel File</h3>
                <p className="text-gray-500 mb-6">
                  Upload an Excel file with columns: Name, Department, Email, Phone, Role
                </p>
                <label className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                  <Upload className="h-5 w-5 mr-2" />
                  Choose Excel File
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        {isFileUploaded && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, department, email, phone, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-2 focus:ring-indigo-500 rounded-lg bg-gray-50"
                />
              </div>
              {contacts.length > 0 && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  {searchTerm ? (
                    `${filteredContacts.length} of ${contacts.length} contacts matching "${searchTerm}"`
                  ) : (
                    `${contacts.length} contacts available - start typing to search`
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {isFileUploaded && (
          <div className="max-w-6xl mx-auto">
            {!searchTerm ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Start searching</h3>
                <p className="text-gray-500">Type in the search box above to find contacts</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No contacts found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={contact.profilePicture}
                          alt={contact.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            {contact.name}
                          </h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDepartmentColor(contact.department)}`}>
                            {contact.department}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <UserCheck className="h-4 w-4 mr-3 text-gray-400" />
                        <span className="text-sm">{contact.role}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-3 text-gray-400" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-sm hover:text-indigo-600 transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-3 text-gray-400" />
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-sm hover:text-indigo-600 transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upload New File Button */}
        {isFileUploaded && (
          <div className="text-center mt-8">
            <label className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
              <Upload className="h-5 w-5 mr-2" />
              Upload New File
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;