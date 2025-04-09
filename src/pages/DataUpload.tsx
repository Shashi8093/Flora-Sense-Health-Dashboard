
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileUp, Check, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { processHealthData } from '@/utils/dataProcessor';

const DataUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Upload</h1>
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
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
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
                <div className="text-center py-8">
                  <p className="text-gray-500">No previous uploads found</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataUpload;
