// [path]: app/(public)/projects/[projectId]/build-book/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { getProjectById } from '@/lib/data-service';
import { Project, Part } from '@/lib/types';
import Image from 'next/image';
import { Download, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function BuildBookPage({ params }: { params: { projectId: string } }) {
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPrinting, setIsPrinting] = useState(false);
    const router = useRouter();
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const foundProject = getProjectById(params.projectId);
        setProject(foundProject || null);
        setIsLoading(false);
    }, [params.projectId]);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;
        
        setIsPrinting(true);

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#111111',
                useCORS: true,
                logging: false,
            });
    
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });
    
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
    
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            
            const imgHeight = pdfWidth / ratio;
            let heightLeft = imgHeight;
            let position = 0;
    
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
    
            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
            
            pdf.save(`${project?.car.year}-${project?.car.make}-${project?.car.model}-BuildBook.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Sorry, there was an error generating the PDF. Please check the console for details.");
        } finally {
            setIsPrinting(false);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center pt-20"><p>Loading Build Book...</p></div>;
    if (!project) return notFound();

    const heroImage = project.media.find(m => m.caption.includes('finished')) || project.media[0] || { url: 'https://placehold.co/1280x720/1f2937/ffffff?text=Project+Image', caption: 'Project Image' };
    const allParts = project.categories.flatMap(c => c.subTasks.flatMap(t => t.parts || [])).filter((part): part is Part => part !== undefined);

    return (
        <div className="bg-background text-foreground min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <Button onClick={() => router.back()} variant="secondary" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Project
                    </Button>
                    <Button onClick={handleDownloadPdf} variant="primary" size="sm" disabled={isPrinting}>
                        {isPrinting ? 'Generating...' : <><Download className="h-4 w-4 mr-2" />Download as PDF</>}
                    </Button>
                </div>

                {/* --- THIS SECTION IS CORRECTED --- */}
                {/* Replaced opacity-based colors with solid colors for PDF compatibility */}
                <div ref={printRef} className="p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
                    <div className="relative h-80 rounded-lg overflow-hidden mb-8">
                        <Image src={heroImage.url} alt={heroImage.caption} fill className="object-cover" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-4xl font-bold text-white tracking-tight">{project.car.year} {project.car.make} {project.car.model}</h1>
                            <p className="text-lg text-gray-300">A Restoration Journey for {project.customerName}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-gray-700 py-6 mb-8">
                        <div><p className="text-sm text-gray-400">VIN</p><p className="font-semibold text-white">{project.car.vin || 'N/A'}</p></div>
                        <div><p className="text-sm text-gray-400">Completed</p><p className="font-semibold text-white">{project.promisedDate || 'N/A'}</p></div>
                        <div><p className="text-sm text-gray-400">Mileage In</p><p className="font-semibold text-white">{project.car.mileageIn?.toLocaleString() || 'N/A'}</p></div>
                        <div><p className="text-sm text-gray-400">Final Cost</p><p className="font-semibold text-green-400">{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(project.financials.totalQuoted)}</p></div>
                    </div>
                    
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500 pb-2">The Journey</h2>
                        <ul className="space-y-4">
                            {project.timeline.map(item => (
                                <li key={item.id}>
                                    <p className="font-semibold text-gray-300">{item.update}</p>
                                    <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {item.category}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500 pb-2">Gallery Showcase</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {project.media.map(item => (
                                <div key={item.id} className="relative aspect-video rounded-md overflow-hidden"><Image src={item.url} alt={item.caption} fill className="object-cover" unoptimized/></div>
                            ))}
                        </div>
                    </div>

                    {allParts.length > 0 &&
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500 pb-2">Major Components</h2>
                            <ul className="columns-2 text-gray-300 list-disc list-inside">
                                {allParts.map(part => (<li key={part.id}>{part.name}</li>))}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}