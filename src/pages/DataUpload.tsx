
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileUp, Check, AlertCircle, ArrowLeft, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { processHealthData } from '@/utils/dataProcessor';

interface UploadHistoryItem {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  status: 'success' | 'failed';
  fileType: string;
}

const DataUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load upload history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('uploadHistory');
    if (savedHistory) {
      setUploadHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return extension === 'csv' || extension === 'json';
      });
      
      if (validFiles.length !== selectedFiles.length) {
        toast({
          title: "Invalid file format",
          description: "Only CSV and JSON files are supported.",
          variant: "destructive",
        });
      }
      
      setFiles(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return extension === 'csv' || extension === 'json';
      });
      
      if (validFiles.length !== droppedFiles.length) {
        toast({
          title: "Invalid file format",
          description: "Only CSV and JSON files are supported.",
          variant: "destructive",
        });
      }
      
      setFiles(validFiles);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Start the upload process
    setUploadStatus('uploading');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus('processing');
        
        // Simulate processing of files
        setTimeout(() => {
          try {
            // Process the uploaded files (in a real app, this would parse the files)
            const processedData = processHealthData(files);
            console.log("Processed data:", processedData);
            
            // Add to upload history
            const newHistoryItems: UploadHistoryItem[] = files.map(file => ({
              id: Date.now() + Math.random().toString(36).substring(2, 9),
              fileName: file.name,
              fileSize: file.size,
              uploadDate: new Date().toISOString(),
              status: 'success',
              fileType: file.name.split('.').pop()?.toLowerCase() || 'unknown'
            }));
            
            const updatedHistory = [...newHistoryItems, ...uploadHistory];
            setUploadHistory(updatedHistory);
            
            // Save to localStorage
            localStorage.setItem('uploadHistory', JSON.stringify(updatedHistory));
            
            setUploadStatus('success');
            toast({
              title: "Upload successful",
              description: `${files.length} file${files.length > 1 ? 's' : ''} processed successfully.`,
            });
            
            // Navigate to dashboard after successful upload
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          } catch (error) {
            setUploadStatus('error');
            toast({
              title: "Processing error",
              description: "An error occurred while processing your files.",
              variant: "destructive",
            });
          }
        }, 2000);
      }
    }, 100);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Data Upload</h1>
        </div>
        <p className="text-gray-600 mb-6">Upload your health data files to analyze and visualize your health metrics</p>
        
        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Upload Health Data</CardTitle>
                  <CardDescription>
                    Upload CSV or JSON files containing your health metrics data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      uploadStatus === 'idle' ? 'border-gray-300 hover:border-flora-green cursor-pointer' : 'border-gray-200'
                    }`}
                    onDragOver={uploadStatus === 'idle' ? handleDragOver : undefined}
                    onDrop={uploadStatus === 'idle' ? handleDrop : undefined}
                    onClick={uploadStatus === 'idle' ? triggerFileInput : undefined}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".csv,.json"
                      multiple
                      disabled={uploadStatus !== 'idle'}
                    />
                    
                    {uploadStatus === 'idle' && (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Drag and drop your files here</h3>
                        <p className="text-sm text-gray-500 mb-4">or click to browse your files</p>
                        <p className="text-xs text-gray-400">Supported formats: CSV, JSON</p>
                      </>
                    )}
                    
                    {uploadStatus === 'uploading' && (
                      <div className="py-4">
                        <FileUp className="h-12 w-12 text-flora-green mx-auto mb-4 animate-pulse" />
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Uploading files...</h3>
                        <Progress value={uploadProgress} className="w-full max-w-md mx-auto mb-2" />
                        <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
                      </div>
                    )}
                    
                    {uploadStatus === 'processing' && (
                      <div className="py-4">
                        <div className="h-12 w-12 rounded-full border-4 border-flora-green border-t-transparent animate-spin mx-auto mb-4"></div>
                        <h3 className="text-lg font-medium text-gray-900">Processing your data...</h3>
                        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                      </div>
                    )}
                    
                    {uploadStatus === 'success' && (
                      <div className="py-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Upload complete!</h3>
                        <p className="text-sm text-gray-500 mt-2">Your data has been processed successfully</p>
                      </div>
                    )}
                    
                    {uploadStatus === 'error' && (
                      <div className="py-4">
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Upload failed</h3>
                        <p className="text-sm text-gray-500 mt-2">There was an error processing your files</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => setUploadStatus('idle')}
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {files.length > 0 && uploadStatus === 'idle' && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Files ({files.length})</h4>
                      <ul className="space-y-2">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <div className="bg-gray-100 p-2 rounded">
                                <FileUp className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <span className="sr-only">Remove</span>
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {uploadStatus === 'idle' && (
                    <Button 
                      onClick={handleUpload} 
                      disabled={files.length === 0}
                      className="flora-gradient border-0"
                    >
                      Upload and Process
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                  <CardDescription>
                    How to prepare your health data files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Supported Formats</h4>
                    <p className="text-sm text-gray-600">CSV, JSON</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Required Data</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      <li>Heart rate measurements</li>
                      <li>Blood pressure readings</li>
                      <li>Sleep data</li>
                      <li>Activity metrics</li>
                      <li>Timestamps for all records</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Sample Format (JSON)</h4>
                    <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                      {`{
  "timestamp": "2023-04-09T08:30:00Z",
  "heart_rate": 72,
  "blood_pressure": {
    "systolic": 120,
    "diastolic": 80
  },
  "sleep": {
    "duration": 7.5,
    "quality": "good"
  }
}`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Need Help?</h4>
                    <p className="text-sm text-gray-600">Check our <a href="#" className="text-flora-green hover:underline">documentation</a> for detailed format specifications.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>
                  Review your previous data uploads
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadHistory.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {uploadHistory.map((item) => (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full ${
                              item.fileType === 'csv' ? 'bg-green-100' : 'bg-blue-100'
                            }`}>
                              <FileUp className={`h-4 w-4 ${
                                item.fileType === 'csv' ? 'text-green-600' : 'text-blue-600'
                              }`} />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">{item.fileName}</h4>
                              <div className="flex items-center mt-1">
                                <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                <span className="text-xs text-gray-500">{formatDate(item.uploadDate)}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-xs text-gray-500">{formatFileSize(item.fileSize)}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === 'success' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.status === 'success' ? 'Processed' : 'Failed'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">View Report</Button>
                          <Button variant="ghost" size="sm">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No previous uploads found</p>
                    <Button 
                      variant="outline"
                      className="mt-4"
                      onClick={() => setActiveTab('upload')}
                    >
                      Upload New Files
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataUpload;
