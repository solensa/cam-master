"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X, Calendar, User, Tag, Download, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Abstract {
  id: number;
  title: string;
  author: string;
  year: number;
  excerpt: string;
  pdfUrl: string;
  tags: string[];
  profile: string;
}

const abstracts: Abstract[] = [
  {
    id: 1,
    title:
      "Beyond 2D drawings: exploring the benefits and barriers to model-based construction in the UK",
    author: "Andrew Bell",
    year: 2024,
    excerpt:
      "Despite significant advances in the adoption of Building Information Modelling (BIM) and 3D design in the construction industry in recent years, 2D drawings largely remain the baseline for the communication of construction design information.",
    pdfUrl: "/pdfs/andrew-bell-2024.pdf",
    tags: ["engineering", "design phase"],
    profile: "a-bell.jpeg",
  },
  {
    id: 2,
    title:
      'Creation of teams and whether the new "teaming" approach has a future in the UK construction industry',
    author: "Andrew Hunt",
    year: 2024,
    excerpt:
      "The UK construction industry faces persistent challenges in efficiency, productivity, and safety. Despite numerous reports and initiatives, issues such as poor project performance, cost overruns, and high injury rates continue to plague the sector.",
    pdfUrl: "/pdfs/andrew-hunt-2024.pdf",
    tags: ["partnering", "management", "engineering", "health and wellbeing"],
    profile: "a-hunt.jpeg",
  },
  {
    id: 3,
    title:
      "The site office – an exploration into how temporary workspaces can be designed to maximise productivity and wellbeing",
    author: "Chris Rose",
    year: 2024,
    excerpt:
      "This study investigates the relationship between leadership priorities in providing temporary office facilities on active construction projects and the experiences of the users operating in these facilities.",
    pdfUrl: "/pdfs/chris-rose-2024.pdf",
    tags: ["productivity", "wellbeing", "workplace design"],
    profile: "c-rose.jpeg",
  },
  {
    id: 4,
    title:
      "Perceptions of empowerment and management productivity in construction – a case study at a joint venture on a nuclear power plant",
    author: "Matt Paradise",
    year: 2024,
    excerpt:
      "This research explores manager perception of productivity, unearthing insights of the enablers and constraints, through the theme of empowerment at Hinkley Point C – the only live nuclear construction project in the UK.",
    pdfUrl: "/pdfs/matt-paradise-2024.pdf",
    tags: ["management", "productivity", "empowerment", "case study"],
    profile: "m-paradise.jpeg",
  },
  {
    id: 5,
    title:
      "Driving improvements within the design phase of construction projects: the implementation of lean design management",
    author: "Gavin Miller",
    year: 2024,
    excerpt:
      "Although on-time completion is a key success factor for most construction projects in the UK, it is public knowledge that construction projects often finish late. Research suggests that issues during the design phase are a root cause for construction projects in the UK finishing late.",
    pdfUrl: "/pdfs/gavin-miller-2024.pdf",
    tags: ["lean design", "design phase", "engineering", "management"],
    profile: "g-miller.jpeg",
  },
  {
    id: 6,
    title:
      "How to empower technical professionals to create sustainable change in the construction industry",
    author: "Helen Read",
    year: 2024,
    excerpt:
      "This study identifies and assesses factors like psychological safety, locus of control, and knowledge resources that influence the empowerment of employees to drive sustainability in construction.",
    pdfUrl: "/pdfs/helen-read-2024.pdf",
    tags: ["sustainability", "empowerment", "technical professionals", "change management"],
    profile: "h-read.jpeg",
  },
  {
    id: 7,
    title:
      "Addressing gender imbalance in the construction industry: investigation of intervention to promote construction industry in secondary school",
    author: "Oka Chan",
    year: 2024,
    excerpt:
      "The construction industry, a vital part of the economy, faces a significant skills shortage and negative perceptions among young people. Addressing these issues is crucial for fostering a more inclusive and innovative work environment.",
    pdfUrl: "/pdfs/oka-chan-2024.pdf",
    tags: ["diversity & inclusion", "early careers", "education"],
    profile: "o-chan.jpeg",
  },
  {
    id: 8,
    title: "How does funding private construction with debt influence the allocation of risk?",
    author: "Ian Seabrook",
    year: 2024,
    excerpt:
      "This research explores how debt funding impacts risk allocation in private construction projects, revealing concerns about fixed-price contracts and highlighting the need for more collaborative procurement.",
    pdfUrl: "/pdfs/ian-seabrook-2024.pdf",
    tags: ["procurement", "risk", "finance", "private construction"],
    profile: "i-seabrook.jpeg",
  },
  {
    id: 9,
    title:
      "How do we measure the ‘workload’ on our people? What construction can learn from the measurable and planned preventive approach of sport science towards health, wellbeing, and human performance.",
    author: "Graham Brierley",
    year: 2024,
    excerpt:
      "This dissertation proposes a framework inspired by athlete workload monitoring to proactively measure and manage health and wellbeing in the construction workforce.",
    pdfUrl: "/pdfs/graham-brierley-2024.pdf",
    tags: ["health and wellbeing", "performance", "workload", "sport science"],
    profile: "g-brierley.jpg",
  },
  {
    id: 10,
    title:
      "Carbon-reducing construction methods in infrastructure: a mixed-methods study on life cycle assessment and its implementation",
    author: "Edel Power",
    year: 2023,
    excerpt:
      "The construction industry faces significant challenges to meeting net zero targets set by national and international legislation. The Climate Change Act 2008 and its Sixth Carbon Budget commits the UK to reducing carbon emissions by 77% on its 1990 levels by 2037.",
    pdfUrl: "/pdfs/edel-powers-2023.pdf",
    tags: ["sustainability", "engineering", "management"],
    profile: "e-power.jpeg",
  },
  {
    id: 11,
    title:
      "To what extent will the higher education and early careers system deliver the engineer of the future?",
    author: "Nicholas Povey",
    year: 2023,
    excerpt:
      "This research aimed to gauge the effectiveness of the higher education and early careers system in delivering the civil or construction engineer of the future. Without effective implementation, the skillset of construction engineers will be asynchronous to society’s needs.",
    pdfUrl: "/pdfs/nicholas-povey-2023.pdf",
    tags: ["education", "future skills", "engineering", "early careers"],
    profile: "n-povey.jpeg",
  },
  {
    id: 12,
    title: "Exploring Enablers for Deploying an Integrated Rebar Inventory Tool to Enhance Contractor-Client-Supply Chain Relationships",
    author: "Abdullah Bhalli",
    year: 2025,
    excerpt: "This study addresses the enduring challenge of implementing an integrated material management system for rebar procurement, leveraging 3D design information to enhance inventory efficiency. It explores how stakeholder perspectives can reveal opportunities such as reducing procurement times and repurposing existing stock.",
    pdfUrl: "/pdfs/abdullah-bhalli-2023.pdf",
    tags: ["supply chain", "digital tools", "inventory management", "rebar"],
    profile: "a-bhalli.jpeg"
  },
  {
    id: 13,
    title: "Sharing Insights: Comparing the Design Process in Shipbuilding and Construction",
    author: "Alexandra Walker",
    year: 2025,
    excerpt: "This research investigates the potential for cross-industry learning between shipbuilding and construction. Despite similar challenges, shipbuilding has embraced integrated design processes and single 3D CAD models more effectively, highlighting both opportunities and cultural barriers in construction.",
    pdfUrl: "/pdfs/alexandra-walker-2023.pdf",
    tags: ["design", "BIM", "cross-industry learning", "shipbuilding"],
    profile: "a-walker.jpeg"
  },
  {
    id: 14,
    title: "Perceptions of Psychological Safety in Construction",
    author: "Arya Ambujakshan",
    year: 2025,
    excerpt: "This qualitative study examines psychological safety within multinational construction hubs, revealing gaps between policy and practice. Findings stress leadership-driven interventions and context-sensitive measures to foster open communication and stronger safety cultures on sites.",
    pdfUrl: "/pdfs/arya-ambujakshan-2023.pdf",
    tags: ["psychological safety", "workforce", "leadership", "wellbeing"],
    profile: "a-ambujakshan.jpeg"
  },
  {
    id: 15,
    title: "Enhancing Productivity in Reinforced Concrete Frame Buildings: A Study of Modern Construction Methods and Off-Site Manufacturing",
    author: "Ausra Vadapolaite",
    year: 2025,
    excerpt: "This dissertation shows how off-site manufacturing can significantly enhance productivity in reinforced concrete construction, particularly where designs are standardised. Complexity, lack of standardisation, and cultural resistance remain key barriers to maximising these benefits.",
    pdfUrl: "/pdfs/ausra-vadapolaite-2023.pdf",
    tags: ["productivity", "modern methods", "off-site manufacturing", "reinforced concrete"],
    profile: "a-vadapolaite.jpeg"
  },
  {
    id: 16,
    title: "Construction Workforce Perceptions of Rebar Placement Automation",
    author: "Bart Drazyk",
    year: 2025,
    excerpt: "This research explores workforce perceptions of automation in rebar placement, balancing concerns about job displacement and safety with openness to training and innovation. Success depends on inclusive implementation and structured workforce engagement.",
    pdfUrl: "/pdfs/bart-drazyk-2023.pdf",
    tags: ["automation", "rebar", "workforce", "technology adoption"],
    profile: "b-drazyk.jpeg"
  },
  {
    id: 17,
    title: "Building Better Meeting",
    author: "Callum Alderton",
    year: 2025,
    excerpt: "This study analyses meeting practices in construction organisations, revealing inconsistent application of good practices and prevalent counterproductive behaviours. It recommends systemic interventions such as guidelines and facilitation training to improve effectiveness.",
    pdfUrl: "/pdfs/callum-alderton-2023.pdf",
    tags: ["meetings", "productivity", "project management", "teamwork"],
    profile: "c-alderton.jpeg"
  },
  {
    id: 18,
    title: "Advancing Offsite Manufacturing (Industry 4.0 and Smart Factories in the UK and Ireland)",
    author: "James Turner",
    year: 2025,
    excerpt: "This dissertation examines adoption of Industry 4.0 technologies in offsite manufacturing, showing uneven uptake across tools like cloud computing, BIM, AI, and IoT. Organisational barriers, rather than technical, are slowing transformation.",
    pdfUrl: "/pdfs/james-turner-2023.pdf",
    tags: ["Industry 4.0", "off-site manufacturing", "digital transformation", "smart factories"],
    profile: "j-turner.jpeg"
  },
  {
    id: 19,
    title: "A Framework for Utilising Activity-Level Site Data during the Construction Phase of Projects",
    author: "Joe Willock",
    year: 2025,
    excerpt: "This study develops a DIKW-based framework for capturing and using activity-level site data to improve productivity. Findings highlight barriers such as limited engagement from site engineers and the need for feedback loops and data automation.",
    pdfUrl: "/pdfs/joe-willock-2023.pdf",
    tags: ["site data", "DIKW", "productivity", "digital tools"],
    profile: "j-willock.jpeg"
  },
  {
    id: 20,
    title: "Assessing the Potential of CFA Piling Rig Telemetry Data for Stratigraphic Profiling and Optimised Pile Installation",
    author: "John Hopkins",
    year: 2025,
    excerpt: "This dissertation applies machine learning to CFA piling telemetry data to identify rock boundaries in real time. Findings suggest that supervised models can enhance safety and reduce material use, while unsupervised methods unlock historic datasets.",
    pdfUrl: "/pdfs/john-hopkins-2023.pdf",
    tags: ["machine learning", "telemetry", "geotechnics", "piling"],
    profile: "j-hopkins.jpeg"
  },
  {
    id: 21,
    title: "Early Integration of Contractor Expertise in Complex Construction Projects: Client and Contractor Perspectives",
    author: "Sarah Levett",
    year: 2025,
    excerpt: "This qualitative research explores how perceptions, motivations, and project complexities influence early contractor involvement. It identifies enablers such as shared incentives, cultural alignment, and trusted relationships, emphasising systems-thinking approaches.",
    pdfUrl: "/pdfs/sarah-levett-2023.pdf",
    tags: ["early contractor involvement", "collaboration", "complex projects", "supply chain"],
    profile: "s-levett.jpeg"
  }
]
];

const availableTags = [
  "sustainability",
  "diversity & inclusion",
  "nuclear",
  "partnering",
  "management",
  "temporary workspaces",
  "site office",
  "early careers",
  "education",
  "engineering",
  "design phase",
  "lean design",
  "workload",
  "health and wellbeing",
];

export default function CambridgeAbstracts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAbstracts = useMemo(() => {
    return abstracts.filter((abstract) => {
      const matchesSearch = abstract.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => abstract.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-md p-8 border border-gray-200 shadow-lg mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Logos */}
              <div className="flex items-center gap-3">
                <div className="w-20 h-16 flex items-center justify-center">
                  <img
                    src="/images/lor-logo.svg"
                    alt="Laing O'Rourke"
                    className="h-[80px] w-[200px]"
                  />
                </div>
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src="/images/cam-logo.svg"
                    alt="University of Cambridge"
                    className="h-[60px]"
                  />
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row gap-6 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search abstracts by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-[#292D35] focus:ring-[#292D35]/20 rounded-md"
                  />
                </div>
                <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-14 px-8 bg-[#FFCD00] border-[#FFCD00] text-black hover:bg-[#FFCD00]/80 hover:border-[#FFCD00]/80 rounded-md transition-all duration-300"
                    >
                      <Filter className="h-6 w-6 mr-3" />
                      Filter by Tags
                      {selectedTags.length > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-3 bg-[#FFCD00] text-black border-0"
                        >
                          {selectedTags.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-6 bg-white border-gray-200 rounded-md shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-gray-800">Filter by Tags</h3>
                        {selectedTags.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-sm hover:bg-red-50"
                          >
                            Clear All
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
                        {availableTags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Checkbox
                              id={tag}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={() => handleTagToggle(tag)}
                              className="data-[state=checked]:bg-[#292D35] data-[state=checked]:border-[#292D35]"
                            />
                            <label
                              htmlFor={tag}
                              className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                            >
                              {tag}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters */}
            {selectedTags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <span className="text-gray-600 font-medium">Active filters:</span>
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer bg-[#292D35] text-white border-0 hover:bg-red-500 transition-colors px-3 py-1 rounded-full"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3 ml-2" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600 text-md text-center">
              Showing{" "}
              <span className="text-[#292D35] font-semibold">{filteredAbstracts.length}</span> of{" "}
              <span className="text-[#292D35] font-semibold">{abstracts.length}</span> abstracts
            </p>
          </div>
        </div>
      </div>

      {/* Abstracts Gallery */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredAbstracts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200 shadow-lg max-w-md mx-auto">
                <p className="text-2xl text-gray-700 mb-6">No abstracts found</p>
                <p className="text-gray-500 mb-8">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={clearFilters}
                  className="bg-[#292D35] hover:bg-[#1f2329] text-white border-0 rounded-md px-8 py-3"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredAbstracts.map((abstract) => (
                <Card
                  key={abstract.id}
                  className="py-0 gap-0 group cursor-pointer bg-white border-gray-200 hover:border-[#292D35] hover:shadow-xl hover:shadow-[#292D35]/10 transition-all duration-500 hover:scale-105 rounded-md overflow-hidden h-[490px] flex flex-col"
                  onClick={() => setSelectedAbstract(abstract)}
                >
                  {/* Header Section with Dark Background */}
                  <div className="bg-[#292D35] p-8">
                    {/* Title */}
                    <CardTitle className="text-xl font-light leading-tight line-clamp-3 text-white group-hover:text-[#FFCD00]/90 transition-colors mb-4 century-gothic">
                      {abstract.title}
                    </CardTitle>

                    {/* Profile, Name and Date grouped together */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-15 h-15 rounded-full overflow-hidden border-2 border-[#FFCD00]/30 group-hover:border-[#FFCD00] transition-colors flex-shrink-0">
                        <img
                          src={`/images/${abstract.profile}?height=80&width=80`}
                          alt={`${abstract.author} profile`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[#FFCD00] font-medium leading-tight">
                          {abstract.author}
                        </p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#FFCD00]" />
                          <span className="text-[#FFCD00] text-sm font-medium pt-1">
                            {abstract.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Orange Divider */}
                  <div className="h-[5px] bg-[#FF7300] flex-shrink-0"></div>

                  {/* Content Section with White Background */}
                  <CardContent className="p-6 pt-4 bg-white flex-grow flex flex-col min-h-0">
                    <p className="text-gray-600 mb-0 line-clamp-6 leading-relaxed flex-grow max-h-[160px]">
                      {abstract.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {abstract.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-gray-50 text-gray-600 border-gray-300 rounded-full px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {abstract.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-[#292D35]/10 text-[#292D35] border-[#292D35]/30 rounded-full px-3 py-1"
                        >
                          +{abstract.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PDF Modal */}
      <Dialog open={!!selectedAbstract} onOpenChange={() => setSelectedAbstract(null)}>
        <DialogContent className="max-w-7xl max-h-[95vh] min-w-[90%] p-0 bg-white border-gray-200 rounded-3xl overflow-hidden gap-0">
          {selectedAbstract && (
            <>
              <DialogHeader className="px-16 py-6 border-b border-white/20 bg-[#292D35]">
                {/* <button
                  onClick={() => setSelectedAbstract(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="h-5 w-5 text-[#FFCD00]" />
                </button> */}
                <div className="flex items-start justify-between ">
                  <div className="flex items-start gap-6 flex-1 pr-4 ">
                    <div className="flex-1">
                      <DialogTitle className="text-2xl font-bold text-white leading-tight mb-3">
                        {selectedAbstract.title}
                      </DialogTitle>
                      <div className="flex items-center gap-6 text-[#FFCD00] mb-4">
                        <span className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          <span className="font-medium text-lg">{selectedAbstract.author}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span className="font-medium">{selectedAbstract.year}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAbstract.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-white text-[#292D35] border-white/20 rounded-full px-3 py-1"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent border-[#FFCD00] text-[#FFCD00] hover:bg-[#FFCD00] hover:text-black"
                      onClick={() => window.open(selectedAbstract.pdfUrl, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent border-[#FFCD00] text-[#FFCD00] hover:bg-[#FFCD00] hover:text-black"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = selectedAbstract.pdfUrl;
                        link.download = `${selectedAbstract.author.replace(" ", "-")}-${
                          selectedAbstract.year
                        }.pdf`;
                        link.click();
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex-1 p-0">
                <iframe
                  src={selectedAbstract.pdfUrl}
                  className="w-full h-[calc(95vh-200px)] border-0"
                  title={`${selectedAbstract.title} - ${selectedAbstract.author}`}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
