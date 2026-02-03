import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import SVG icons
import SearchIcon from '../../assets/icons/Search-property.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import ViewIcon from '../../assets/icons/eye-close.svg'; 
import PreviousIcon from '../../assets/icons/PreviousIcon.svg';
import NextIcon from '../../assets/icons/NextIcon.svg';
import AscendingIcon from '../../assets/icons/ChevronLeft.svg';
import DescendingIcon from '../../assets/icons/ChevronRight.svg';
import DeleteActionIcon from '../../assets/icons/Button (1).svg';
import CloseIcon from '../../assets/icons/close.svg';
import CallIcon from '../../assets/icons/call.svg';
import EmailIcon from '../../assets/icons/email.svg';
import StatusIcon from '../../assets/icons/ChevronRight.svg';

// Sample inquiry data - will be replaced by contact form submissions
const INITIAL_INQUIRIES = [
  {
    id: 1,
    name: 'Riya Patil',
    email: 'riya.p@sumago.com',
    propertyInterested: 'Luxury Villa in Beverly Hills',
    phone: '91777877889',
    inquiryDate: '12-08-2026',
    status: 'Contacted',
    message: "I'm interested in Scheduling A Viewing For Property",
    deleteDate: '11-02-2026'
  },
  {
    id: 2,
    name: 'Rajesh Patil',
    email: 'shawtraders@yahoo.com',
    propertyInterested: 'Modern Downtown Apartment',
    phone: '91989898989',
    inquiryDate: '11-02-2026',
    status: 'New',
    message: 'Please send me more details about the apartment.',
    deleteDate: '11-02-2026'
  },
  {
    id: 3,
    name: 'Rakesh Shetty',
    email: 'guptasup@gmail.com',
    propertyInterested: 'Suburban Family Home',
    phone: '91777777777',
    inquiryDate: '10-02-2025',
    status: 'Closed',
    message: 'Can you provide floor plans?',
    deleteDate: '11-02-2025'
  },
  {
    id: 4,
    name: 'Kiran More',
    email: 'kmoretrans@gmail.com',
    propertyInterested: 'Mountain View Estate',
    phone: '91666666666',
    inquiryDate: '09-02-2026',
    status: 'New',
    message: 'I would like to schedule a virtual tour.',
    deleteDate: '11-02-2026'
  },
  {
    id: 5,
    name: 'Sunita Shah',
    email: 'sharmasteel@gmail.com',
    propertyInterested: 'Urban Loft',
    phone: '91555555555',
    inquiryDate: '08-02-2024',
    status: 'Contacted',
    message: 'Is there parking available?',
    deleteDate: '11-02-2024'
  },
];

const Inquiries = () => {
  // Function to load and merge contact form submissions
  const loadInquiries = () => {
    // Load contact form submissions
    const contactSubmissions = localStorage.getItem('contactFormSubmissions');
    const contactInquiries = contactSubmissions ? JSON.parse(contactSubmissions) : [];
    
    // Transform contact submissions to match inquiry format
    const transformedContactInquiries = contactInquiries.map(contact => ({
      id: contact.id,
      name: contact.fullName,
      email: contact.email,
      propertyInterested: 'Contact Form Inquiry', // Default since contact form doesn't have property field
      phone: contact.phone,
      inquiryDate: formatTimestampToDate(contact.timestamp),
      status: 'New', // Default status for new contact submissions
      message: contact.message,
      deleteDate: formatTimestampToDate(contact.timestamp),
      source: 'contact-form' // Add source identifier
    }));

    // Load existing inquiries
    const savedInquiries = localStorage.getItem('inquiries');
    const existingInquiries = savedInquiries ? JSON.parse(savedInquiries) : INITIAL_INQUIRIES;
    
    // Filter out existing inquiries that came from contact form to avoid duplicates
    const nonContactInquiries = existingInquiries.filter(inq => inq.source !== 'contact-form');
    
    // Merge both arrays, with contact form submissions first (most recent)
    return [...transformedContactInquiries, ...nonContactInquiries];
  };

  // Helper function to format ISO timestamp to DD-MM-YYYY
  const formatTimestampToDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Initialize state from localStorage or use defaults
  const [inquiries, setInquiries] = useState(() => loadInquiries());

  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearchTerm = localStorage.getItem('inquiriesSearchTerm');
    return savedSearchTerm || '';
  });

  const [selectedInquiries, setSelectedInquiries] = useState(() => {
    const savedSelected = localStorage.getItem('selectedInquiries');
    return savedSelected ? JSON.parse(savedSelected) : [];
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('inquiriesCurrentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });

  const [sortConfig, setSortConfig] = useState(() => {
    const savedSort = localStorage.getItem('inquiriesSortConfig');
    return savedSort ? JSON.parse(savedSort) : { key: null, direction: 'asc' };
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(() => {
    const savedStatus = localStorage.getItem('selectedStatus');
    return savedStatus || 'All';
  });

  // Reload inquiries when component mounts or when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setInquiries(loadInquiries());
    };

    // Listen for storage events (changes from other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Set up interval to check for new submissions every 2 seconds
    const interval = setInterval(() => {
      const updatedInquiries = loadInquiries();
      setInquiries(updatedInquiries);
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Save to localStorage whenever inquiries change
  useEffect(() => {
    // Only save non-contact-form inquiries to avoid conflicts
    const nonContactInquiries = inquiries.filter(inq => inq.source !== 'contact-form');
    localStorage.setItem('inquiries', JSON.stringify(nonContactInquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('selectedInquiries', JSON.stringify(selectedInquiries));
  }, [selectedInquiries]);

  useEffect(() => {
    localStorage.setItem('inquiriesCurrentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('inquiriesSortConfig', JSON.stringify(sortConfig));
  }, [sortConfig]);

  useEffect(() => {
    localStorage.setItem('inquiriesSearchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('selectedStatus', selectedStatus);
  }, [selectedStatus]);

  // Responsive items per page
  const getItemsPerPage = () => {
    if (windowWidth < 640) return 5;
    if (windowWidth < 1024) return 7;
    return 10;
  };
  
  const itemsPerPage = getItemsPerPage();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sort inquiries
  const sortedInquiries = [...inquiries].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter inquiries based on search and status
  const filteredInquiries = sortedInquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.propertyInterested.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || inquiry.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = filteredInquiries.slice(startIndex, endIndex);
  const totalInquiries = filteredInquiries.length;

  // Handle inquiry selection
  const handleSelectInquiry = (id) => {
    setSelectedInquiries(prev => 
      prev.includes(id) 
        ? prev.filter(inquiryId => inquiryId !== id)
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedInquiries.length === currentInquiries.length) {
      setSelectedInquiries([]);
    } else {
      setSelectedInquiries(currentInquiries.map(inquiry => inquiry.id));
    }
  };

  // Handle delete selected
  const handleDeleteSelected = () => {
    if (selectedInquiries.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedInquiries.length} inquiry(ies)?`)) {
      // Separate contact form and regular inquiries
      const inquiriesToDelete = inquiries.filter(inquiry => selectedInquiries.includes(inquiry.id));
      const contactFormIds = inquiriesToDelete.filter(inq => inq.source === 'contact-form').map(inq => inq.id);
      
      // Delete from contact form submissions
      if (contactFormIds.length > 0) {
        const contactSubmissions = localStorage.getItem('contactFormSubmissions');
        if (contactSubmissions) {
          const submissions = JSON.parse(contactSubmissions);
          const updatedSubmissions = submissions.filter(sub => !contactFormIds.includes(sub.id));
          localStorage.setItem('contactFormSubmissions', JSON.stringify(updatedSubmissions));
        }
      }
      
      // Update state
      setInquiries(prev => prev.filter(inquiry => !selectedInquiries.includes(inquiry.id)));
      setSelectedInquiries([]);
    }
  };

  // Handle delete single inquiry
  const handleDeleteSingle = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      const inquiryToDelete = inquiries.find(inq => inq.id === id);
      
      // If it's from contact form, delete from contactFormSubmissions
      if (inquiryToDelete && inquiryToDelete.source === 'contact-form') {
        const contactSubmissions = localStorage.getItem('contactFormSubmissions');
        if (contactSubmissions) {
          const submissions = JSON.parse(contactSubmissions);
          const updatedSubmissions = submissions.filter(sub => sub.id !== id);
          localStorage.setItem('contactFormSubmissions', JSON.stringify(updatedSubmissions));
        }
      }
      
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle view inquiry
  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  // Handle status change in modal
  const handleStatusChange = (inquiryId, newStatus) => {
    const updatedInquiries = inquiries.map(inquiry => 
      inquiry.id === inquiryId 
        ? { ...inquiry, status: newStatus }
        : inquiry
    );
    setInquiries(updatedInquiries);
    
    // If it's a contact form inquiry, update it in contactFormSubmissions too
    const inquiry = inquiries.find(inq => inq.id === inquiryId);
    if (inquiry && inquiry.source === 'contact-form') {
      const contactSubmissions = localStorage.getItem('contactFormSubmissions');
      if (contactSubmissions) {
        const submissions = JSON.parse(contactSubmissions);
        const updatedSubmissions = submissions.map(sub => 
          sub.id === inquiryId ? { ...sub, status: newStatus } : sub
        );
        localStorage.setItem('contactFormSubmissions', JSON.stringify(updatedSubmissions));
      }
    }
    
    // Update selected inquiry if it's the same one
    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry({...selectedInquiry, status: newStatus});
    }
  };

  // Get status button styles based on status
  const getStatusButtonStyle = (status) => {
    switch(status) {
      case 'New': 
        return { 
          backgroundColor: '#E0ECFF', 
          color: '#272A2F',
        };
      case 'Contacted': 
        return { 
          backgroundColor: '#D4FFD4', 
          color: '#000000',
        };
      case 'Closed': 
        return { 
          backgroundColor: '#E5E5E5', 
          color: '#000000',
        };
      case 'Converted': 
        return { 
          backgroundColor: '#D4EDDA', 
          color: '#000000',
        };
      default: 
        return { 
          backgroundColor: '#E5E7EB', 
          color: '#000000',
        };
    }
  };

  // Status options
  const statusOptions = [
    'All',
    'New',
    'Contacted',
    'Closed',
    'Converted'
  ];

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('-')) {
      const [day, month, year] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }
    if (dateString.includes('/')) {
      return dateString;
    }
    return dateString;
  };

  // CSS Styles with responsive adjustments
  const styles = {
    container: {
      padding: windowWidth < 640 ? '16px' : '42px',
      minHeight: '100vh',
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
    headerRow: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: windowWidth < 640 ? 'flex-start' : 'center',
      marginBottom: '24px',
      gap: windowWidth < 640 ? '16px' : '0',
    },
    headerText: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: windowWidth < 640 ? '24px' : windowWidth < 768 ? '26px' : '28px',
      fontWeight: 700,
      color: '#1E293B',
      margin: '0 0 8px 0',
      fontFamily: 'Montserrat',
    },
    subtitle: {
      fontSize: windowWidth < 640 ? '14px' : '16px',
      color: '#3F74E2',
      margin: 0,
      fontWeight: 500,
      fontFamily: 'Montserrat',
    },
    whiteSection: {
      width: '95%',
      maxWidth: '1111px',
      backgroundColor: 'white',
      borderRadius: '11px',
      border: '1px solid #E2E8F0',
      padding: windowWidth < 640 ? '16px' : '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      margin: '0 auto',
    },
    searchRow: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      alignItems: windowWidth < 640 ? 'stretch' : 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
      gap: '16px',
    },
    searchContainer: {
      position: 'relative',
      flex: windowWidth < 640 ? '0 0 auto' : 1,
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
    },
    searchInput: {
      // width: windowWidth < 640 ? '100%' : '324px',
      height: '16px',
      border: '1px solid #E2E8F0',
      borderRadius: '6px',
      padding: '10px 12px 10px 40px',
      fontSize: '14px',
      color: '#1E293B',
      outline: 'none',
      backgroundColor: 'white',
      fontFamily: 'Montserrat',
    },
    controlsGroup: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      gap: '16px',
      alignItems: windowWidth < 640 ? 'stretch' : 'center',
    },
    filterContainer: {
      position: 'relative',
    },
    allFilterButton: {
      width: windowWidth < 640 ? '100%' : '208px',
      height: '39px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '5px',
      fontSize: '14px',
      color: '#475569',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      transition: 'border-color 0.3s ease',
      fontFamily: 'Montserrat',
    },
    filterDropdown: {
      position: 'absolute',
      top: '45px',
      right: 0,
      left: windowWidth < 640 ? 0 : 'auto',
      width: windowWidth < 640 ? '100%' : '208px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    filterOption: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#475569',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      transition: 'background-color 0.3s ease',
    },
    deleteButton: {
      width: windowWidth < 640 ? '100%' : '163px',
      height: '40px',
      backgroundColor: '#FF3C3C',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px',
      transition: 'background-color 0.3s ease',
      fontFamily: 'Montserrat',
    },
    disabledDeleteButton: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      cursor: 'not-allowed',
    },
    showingText: {
      fontSize: '14px',
      color: '#64748B',
      marginBottom: '16px',
      fontFamily: 'Montserrat',
      textAlign: windowWidth < 640 ? 'center' : 'left',
    },
    tableContainer: {
      width: '100%',
      overflowX: 'auto',
      marginBottom: '24px',
      WebkitOverflowScrolling: 'touch',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      minWidth: windowWidth < 768 ? '800px' : '1100px',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeaderRow: {
      backgroundColor: '#F9FAFB',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      height: '62px',
    },
    // Responsive table cells
    tableHeaderCell: {
      textAlign: 'left',
      fontSize: windowWidth < 640 ? '12px' : '14px',
      fontWeight: 600,
      color: '#374151',
      whiteSpace: 'nowrap',
      position: 'relative',
      fontFamily: 'Montserrat',
      height: '62px',
      boxSizing: 'border-box',
      borderRight: '1px solid #E5E7EB',
      padding: '8px 12px',
    },
    headerCellContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    checkboxHeaderCell: {
      width: windowWidth < 640 ? '30px' : '40px',
      minWidth: windowWidth < 640 ? '30px' : '40px',
      padding: '8px 8px',
    },
    checkboxCell: {
      width: windowWidth < 640 ? '30px' : '40px',
      minWidth: windowWidth < 640 ? '30px' : '40px',
      padding: '8px 8px',
      textAlign: 'center',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
    },
    nameHeaderCell: {
      width: windowWidth < 768 ? '150px' : '200px',
      minWidth: windowWidth < 768 ? '150px' : '200px',
    },
    nameCell: {
      width: windowWidth < 768 ? '150px' : '200px',
      minWidth: windowWidth < 768 ? '150px' : '200px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    emailHeaderCell: {
      width: windowWidth < 768 ? '180px' : '200px',
      minWidth: windowWidth < 768 ? '180px' : '200px',
    },
    emailCell: {
      width: windowWidth < 768 ? '180px' : '200px',
      minWidth: windowWidth < 768 ? '180px' : '200px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    messageHeaderCell: {
      width: windowWidth < 768 ? '200px' : '250px',
      minWidth: windowWidth < 768 ? '200px' : '250px',
    },
    messageCell: {
      width: windowWidth < 768 ? '200px' : '250px',
      minWidth: windowWidth < 768 ? '200px' : '250px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    phoneHeaderCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
    },
    phoneCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    dateHeaderCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
    },
    dateCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    statusHeaderCell: {
      width: windowWidth < 768 ? '100px' : '150px',
      minWidth: windowWidth < 768 ? '100px' : '150px',
    },
    statusCell: {
      width: windowWidth < 768 ? '100px' : '150px',
      minWidth: windowWidth < 768 ? '100px' : '150px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
    },
    actionsHeaderCell: {
      width: windowWidth < 768 ? '80px' : '120px',
      minWidth: windowWidth < 768 ? '80px' : '120px',
    },
    actionsCell: {
      width: windowWidth < 768 ? '80px' : '120px',
      minWidth: windowWidth < 768 ? '80px' : '120px',
      padding: '8px 12px',
      textAlign: 'center',
      borderTop: '1px solid #E5E7EB',
    },
    checkbox: {
      width: windowWidth < 640 ? '14px' : '16px',
      height: windowWidth < 640 ? '14px' : '16px',
      borderRadius: '4px',
      border: '2px solid #D1D5DB',
      cursor: 'pointer',
      accentColor: '#3B82F6',
    },
    statusButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '9px',
      fontSize: windowWidth < 640 ? '12px' : '14px',
      fontWeight: 500,
      cursor: 'default',
      fontFamily: 'Montserrat',
      padding: windowWidth < 640 ? '6px 8px' : '8px 16px',
      width: windowWidth < 768 ? '80px' : '120px',
      height: windowWidth < 640 ? '30px' : '36px',
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: windowWidth < 640 ? '6px' : '12px',
    },
    actionButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '32px',
      minHeight: '32px',
    },
    paginationContainer: {
      display: 'flex',
      flexDirection: windowWidth < 768 ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
      gap: windowWidth < 768 ? '16px' : '0',
    },
    paginationInfo: {
      fontSize: '14px',
      color: '#64748B',
      fontFamily: 'Montserrat',
      textAlign: windowWidth < 768 ? 'center' : 'left',
      order: windowWidth < 768 ? 2 : 1,
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: windowWidth < 768 ? 'center' : 'flex-end',
      order: windowWidth < 768 ? 1 : 2,
    },
    paginationButton: {
  padding: windowWidth < 640 ? '6px 12px' : '8px 16px',
  backgroundColor: 'white',
  border: '1px solid #D1D5DB',
  borderRadius: '6px',
  fontSize: windowWidth < 640 ? '12px' : '14px',
  color: '#374151',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  fontFamily: 'Montserrat',
  whiteSpace: 'nowrap',
},
    disabledPaginationButton: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      cursor: 'not-allowed',
      borderColor: '#E5E7EB',
    },
    pageNumberButton: {
  minWidth: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  border: '1px solid #ffffff',
  borderRadius: '6px',
  fontSize: windowWidth < 640 ? '12px' : '14px',
  color: '#374151',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontFamily: 'Montserrat',
},
activePageNumber: {
  backgroundColor: '#DBE7FF',
  color: '#000000',
},
    ellipsis: {
  padding: '0 4px',
  color: '#6B7280',
  fontFamily: 'Montserrat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: windowWidth < 640 ? '12px' : '14px',
},
    // Modal styles - Responsive
        // Modal styles - Responsive (same as Properties page)
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: windowWidth < 640 ? '8px' : '20px',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '100%',
      maxWidth: windowWidth < 640 ? '95%' : windowWidth < 768 ? '90%' : '600px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
    modalHeader: {
      padding: windowWidth < 640 ? '16px 20px' : '24px 32px 16px',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1,
    },
    modalTitle: {
      fontSize: windowWidth < 640 ? '20px' : '24px',
      fontWeight: 600,
      color: '#1E293B',
      margin: 0,
      fontFamily: 'Montserrat',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s ease',
    },
    modalBody: {
      padding: windowWidth < 640 ? '16px 20px' : '24px 32px',
    },
    modalFooter: {
      padding: windowWidth < 640 ? '12px 20px 16px' : '16px 32px 24px',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column-reverse' : 'row',
      justifyContent: 'flex-end',
      gap: '12px',
    },
    cancelButton: {
      padding: windowWidth < 640 ? '10px 16px' : '12px 24px',
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: windowWidth < 640 ? '14px' : '16px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      transition: 'all 0.3s ease',
      width: windowWidth < 640 ? '100%' : 'auto',
    },
    // Add these form styles (same as Properties page)
    formGroup: {
      marginBottom: '20px',
    },
    formLabel: {
      display: 'block',
      fontSize: windowWidth < 640 ? '13px' : '14px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '8px',
      fontFamily: 'Montserrat',
    },
    fieldValue: {
      fontSize: windowWidth < 640 ? '14px' : '16px',
      color: '#1F2937',
      fontFamily: 'Montserrat',
      padding: windowWidth < 640 ? '10px 12px' : '12px 5px',
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      minHeight: windowWidth < 640 ? '14px' : '16px',
      display: 'flex',
      alignItems: 'center',
      wordBreak: 'break-word',
    },
    row: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      gap: '16px',
      marginBottom: '20px',
    },
    col: {
      flex: 1,
      width: windowWidth < 640 ? '100%' : 'auto',
    },
    // Keep your existing button styles but make sure they match
    callButton: {
      width: windowWidth < 640 ? '100%' : '230px',
      height: windowWidth < 640 ? '42px' : '46px',
      padding: '10px',
      backgroundColor: 'white',
      color: '#A237FF',
      border: '1px solid #A237FF',
      borderRadius: '7px',
      fontSize: windowWidth < 640 ? '14px' : '16px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    emailButton: {
      width: windowWidth < 640 ? '100%' : '230px',
      height: windowWidth < 640 ? '42px' : '46px',
      padding: '10px',
      backgroundColor: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '7px',
      fontSize: windowWidth < 640 ? '14px' : '16px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'background-color 0.3s ease',
    },
    actionButtonsGroup: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      gap: windowWidth < 640 ? '12px' : '16px',
      marginTop: windowWidth < 640 ? '16px' : '24px',
      justifyContent: 'center',
    },

    // Mobile table row styles for better touch
    mobileTableRow: {
      cursor: 'pointer',
    },
    // Responsive icons
    responsiveIcon: {
      width: windowWidth < 640 ? '16px' : '26px',
      height: windowWidth < 640 ? '16px' : '26px',
    },
  };


  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        <div style={styles.headerText}>
          <h1 style={styles.title}>Inquiry Management</h1>
          <p style={styles.subtitle}>Manage customer inquiries and leads</p>
        </div>
      </div>

      {/* White Section */}
      <div style={styles.whiteSection}>
        {/* Search and Filter Row */}
        <div style={styles.searchRow}>
          <div style={styles.searchContainer}>
            <img 
              src={SearchIcon} 
              alt="Search" 
              style={styles.searchIcon}
              onError={(e) => e.target.style.display = 'none'}
            />
            <input
              type="text"
              placeholder="Search"
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.controlsGroup}>
            <div style={styles.filterContainer}>
              <button 
                style={styles.allFilterButton}
                onClick={() => setShowFilter(!showFilter)}
                onMouseEnter={(e) => e.target.style.borderColor = '#A237FF'}
                onMouseLeave={(e) => e.target.style.borderColor = '#E2E8F0'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img 
                    src={FilterIcon} 
                    alt="Filter" 
                    style={styles.responsiveIcon}
                    onError={(e) => e.target.style.display = 'none'}
                  /> 
                  <span>{selectedStatus === 'All' ? 'Filter by Status' : selectedStatus}</span>
                </div>
                <img 
                  src={DescendingIcon} 
                  alt="Dropdown" 
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    transform: showFilter ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              </button>
              
              {showFilter && (
                <div style={styles.filterDropdown}>
                  {statusOptions.map((status) => (
                    <div
                      key={status}
                      style={{
                        ...styles.filterOption,
                        backgroundColor: status === selectedStatus ? '#F3F4F6' : 'white',
                      }}
                      onClick={() => {
                        setSelectedStatus(status);
                        setShowFilter(false);
                        setCurrentPage(1); // Reset to first page when filtering
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = status === selectedStatus ? '#F3F4F6' : 'white'}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleDeleteSelected}
              disabled={selectedInquiries.length === 0}
              style={{
                ...styles.deleteButton,
                ...(selectedInquiries.length === 0 && styles.disabledDeleteButton),
              }}
              onMouseEnter={(e) => {
                if (selectedInquiries.length > 0) {
                  e.target.style.backgroundColor = '#DC2626';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedInquiries.length > 0) {
                  e.target.style.backgroundColor = '#FF3C3C';
                }
              }}
            >
              <img 
                src={DeleteIcon} 
                alt="Delete" 
                style={styles.responsiveIcon}
                onError={(e) => e.target.style.display = 'none'}
              />
              Delete ({selectedInquiries.length})
            </button>
          </div>
        </div>

        {/* Close dropdown when clicking outside */}
        {showFilter && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
            }}
            onClick={() => setShowFilter(false)}
          />
        )}

        {/* Table Container with Scroll and Grid Lines */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeaderRow}>
              <tr>
              
                <th style={{ ...styles.tableHeaderCell, ...styles.checkboxHeaderCell }}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={selectedInquiries.length === currentInquiries.length && currentInquiries.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>

                {/* Name */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.nameHeaderCell }}
                  onClick={() => handleSort('name')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Name</div>
                  </div>
                </th>

                {/* Email */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.emailHeaderCell }}
                  onClick={() => handleSort('email')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Email</div>
                  </div>
                </th>

                {/* Message */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.messageHeaderCell }}
                  onClick={() => handleSort('message')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Message</div>
                  </div>
                </th>

                {/* Date */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.dateHeaderCell }}
                  onClick={() => handleSort('inquiryDate')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Date</div>
                  </div>
                </th>

                {/* Phone */}
                <th style={{ ...styles.tableHeaderCell, ...styles.phoneHeaderCell }}>
                  Phone
                </th>

                {/* Status */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.statusHeaderCell }}
                  onClick={() => handleSort('status')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Status</div>
                  </div>
                </th>

                {/* Actions */}
                <th style={{ ...styles.tableHeaderCell, ...styles.actionsHeaderCell }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentInquiries.map((inquiry) => {
                const statusStyle = getStatusButtonStyle(inquiry.status);
                return (
                  <tr key={inquiry.id} style={{ height: '62px' }}>
                    {/* Checkbox */}
                    <td style={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        style={styles.checkbox}
                        checked={selectedInquiries.includes(inquiry.id)}
                        onChange={() => handleSelectInquiry(inquiry.id)}
                      />
                    </td>

                    {/* Name */}
                    <td style={styles.nameCell}>{inquiry.name}</td>

                    {/* Email */}
                    <td style={styles.emailCell}>{inquiry.email}</td>

                    {/* Message */}
                    <td style={styles.messageCell}>
                      {inquiry.message.length > 50 ? inquiry.message.substring(0, 50) + "..." : inquiry.message}
                    </td>

                    {/* Date */}
                    <td style={styles.dateCell}>{formatDate(inquiry.inquiryDate)}</td>

                    {/* Phone */}
                    <td style={styles.phoneCell}>{inquiry.phone}</td>

                    {/* Status */}
                    <td style={styles.statusCell}>
                      <div style={{ ...styles.statusButton, ...statusStyle }}>{inquiry.status}</div>
                    </td>

                    {/* Actions */}
                    <td style={styles.actionsCell}>
                      <div style={styles.actionsContainer}>
                        <button 
                          style={{ ...styles.actionButton, ...styles.viewButton }}
                          onClick={() => handleViewInquiry(inquiry)}
                          aria-label="View inquiry"
                        >
                          <img src={ViewIcon} alt="View" style={styles.responsiveIcon} />
                        </button>
                        <button 
                          style={{ ...styles.actionButton, ...styles.deleteActionButton }}
                          onClick={() => handleDeleteSingle(inquiry.id)}
                          aria-label="Delete inquiry"
                        >
                          <img src={DeleteActionIcon} alt="Delete" style={styles.responsiveIcon} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

       {/* Pagination */}
<div style={styles.paginationContainer}>
  <div style={styles.paginationInfo}>
    Showing {startIndex + 1} - {Math.min(endIndex, totalInquiries)} out of {totalInquiries}
  </div>
  
  <div style={styles.paginationControls}>
    {/* Previous arrow - plain black text with arrow */}
    <div
      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: currentPage > 1 ? 'pointer' : 'default',
        color: currentPage > 1 ? '#000000' : '#9CA3AF',
        fontSize: windowWidth < 640 ? '12px' : '14px',
        fontFamily: 'Montserrat',
        fontWeight: 500,
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (currentPage > 1) {
          e.target.style.textDecoration = 'underline';
        }
      }}
      onMouseLeave={(e) => {
        if (currentPage > 1) {
          e.target.style.textDecoration = 'none';
        }
      }}
      aria-label="Previous page"
    >
      <img 
        src={PreviousIcon} 
        alt="Previous" 
        style={{
          width: windowWidth < 640 ? '12px' : '14px',
          height: windowWidth < 640 ? '12px' : '14px',
          filter: currentPage > 1 ? 'none' : 'opacity(0.5)',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          const span = document.createElement('span');
          span.textContent = '←';
          span.style.fontSize = windowWidth < 640 ? '14px' : '16px';
          span.style.color = currentPage > 1 ? '#000000' : '#9CA3AF';
          e.target.parentNode.appendChild(span);
        }}
      />
      <span>Previous</span>
    </div>

    {/* Page numbers in the middle with button boxes */}
    <button
      key={1}
      onClick={() => handlePageChange(1)}
      style={{
        ...styles.pageNumberButton,
        ...(currentPage === 1 && styles.activePageNumber),
      }}
      onMouseEnter={(e) => {
        if (currentPage !== 1) e.target.style.backgroundColor = '#F9FAFB';
      }}
      onMouseLeave={(e) => {
        if (currentPage !== 1) e.target.style.backgroundColor = 'white';
      }}
      aria-label="Page 1"
      aria-current={currentPage === 1 ? 'page' : undefined}
    >
      1
    </button>

    <button
      key={2}
      onClick={() => handlePageChange(2)}
      style={{
        ...styles.pageNumberButton,
        ...(currentPage === 2 && styles.activePageNumber),
      }}
      onMouseEnter={(e) => {
        if (currentPage !== 2) e.target.style.backgroundColor = '#F9FAFB';
      }}
      onMouseLeave={(e) => {
        if (currentPage !== 2) e.target.style.backgroundColor = 'white';
      }}
      aria-label="Page 2"
      aria-current={currentPage === 2 ? 'page' : undefined}
    >
      2
    </button>

    <span style={styles.ellipsis}>-</span>

    <button
      key={9}
      onClick={() => handlePageChange(9)}
      style={{
        ...styles.pageNumberButton,
        ...(currentPage === 9 && styles.activePageNumber),
      }}
      onMouseEnter={(e) => {
        if (currentPage !== 9) e.target.style.backgroundColor = '#F9FAFB';
      }}
      onMouseLeave={(e) => {
        if (currentPage !== 9) e.target.style.backgroundColor = 'white';
      }}
      aria-label="Page 9"
      aria-current={currentPage === 9 ? 'page' : undefined}
    >
      9
    </button>

    <button
      key={10}
      onClick={() => handlePageChange(10)}
      style={{
        ...styles.pageNumberButton,
        ...(currentPage === 10 && styles.activePageNumber),
      }}
      onMouseEnter={(e) => {
        if (currentPage !== 10) e.target.style.backgroundColor = '#F9FAFB';
      }}
      onMouseLeave={(e) => {
        if (currentPage !== 10) e.target.style.backgroundColor = 'white';
      }}
      aria-label="Page 10"
      aria-current={currentPage === 10 ? 'page' : undefined}
    >
      10
    </button>

    {/* Next arrow - plain black text with arrow */}
    <div
      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: currentPage < totalPages ? 'pointer' : 'default',
        color: currentPage < totalPages ? '#000000' : '#9CA3AF',
        fontSize: windowWidth < 640 ? '12px' : '14px',
        fontFamily: 'Montserrat',
        fontWeight: 500,
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (currentPage < totalPages) {
          e.target.style.textDecoration = 'underline';
        }
      }}
      onMouseLeave={(e) => {
        if (currentPage < totalPages) {
          e.target.style.textDecoration = 'none';
        }
      }}
      aria-label="Next page"
    >
      <span>Next</span>
      <img 
        src={NextIcon} 
        alt="Next" 
        style={{
          width: windowWidth < 640 ? '12px' : '14px',
          height: windowWidth < 640 ? '12px' : '14px',
          filter: currentPage < totalPages ? 'none' : 'opacity(0.5)',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          const span = document.createElement('span');
          span.textContent = '→';
          span.style.fontSize = windowWidth < 640 ? '14px' : '16px';
          span.style.color = currentPage < totalPages ? '#000000' : '#9CA3AF';
          e.target.parentNode.appendChild(span);
        }}
      />
    </div>
  </div>
</div>
      </div>

            {/* Modal for View Inquiry Details */}
      {showModal && selectedInquiry && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Inquiry Details</h2>
              <button 
                style={styles.closeButton}
                onClick={handleCloseModal}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                aria-label="Close modal"
              >
                <img 
                  src={CloseIcon} 
                  alt="Close" 
                  style={styles.responsiveIcon}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const span = document.createElement('span');
                    span.textContent = '×';
                    span.style.fontSize = '24px';
                    e.target.parentNode.appendChild(span);
                  }}
                />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              {/* Customer Name */}
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Customer Name</label>
                <div style={styles.fieldValue}>{selectedInquiry.name}</div>
              </div>
              
              {/* Property Interested and Email */}
              <div style={styles.row}>
                <div style={styles.col}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Property Interested</label>
                    <div style={styles.fieldValue}>{selectedInquiry.propertyInterested}</div>
                  </div>
                </div>
                <div style={styles.col}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email ID</label>
                    <div style={styles.fieldValue}>{selectedInquiry.email}</div>
                  </div>
                </div>
              </div>
              
              {/* Phone and Inquiry Date */}
              <div style={styles.row}>
                <div style={styles.col}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone Number</label>
                    <div style={styles.fieldValue}>{selectedInquiry.phone}</div>
                  </div>
                </div>
                <div style={styles.col}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Inquiry Date</label>
                    <div style={styles.fieldValue}>{formatDate(selectedInquiry.inquiryDate)}</div>
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Status</label>
                <div style={styles.fieldValue}>
                  <button 
                    style={{
                      ...styles.statusButton,
                      ...getStatusButtonStyle(selectedInquiry.status),
                      justifyContent: 'space-between',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const statuses = ['New', 'Contacted', 'Closed', 'Converted'];
                      const currentIndex = statuses.indexOf(selectedInquiry.status);
                      const newStatus = statuses[(currentIndex + 1) % statuses.length];
                      handleStatusChange(selectedInquiry.id, newStatus);
                    }}
                    aria-label={`Change status from ${selectedInquiry.status}`}
                  >
                    <span>{selectedInquiry.status}</span>
                    <span style={{ fontSize: windowWidth < 640 ? '10px' : '12px' }}>▼</span>
                  </button>
                </div>
              </div>
              
              {/* Message */}
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Message</label>
                <div style={{
                  ...styles.fieldValue,
                  minHeight: '100px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.5',
                  padding: '12px 16px'
                }}>
                  {selectedInquiry.message}
                </div>
              </div>
              
              {/* Action buttons */}
              <div style={styles.actionButtonsGroup}>
                <button
                  type="button"
                  style={styles.callButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F5F0FF';
                    e.target.style.borderColor = '#8B1FFF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#A237FF';
                  }}
                  onClick={() => window.location.href = `tel:${selectedInquiry.phone}`}
                  aria-label={`Call ${selectedInquiry.phone}`}
                >
                  <img 
                    src={CallIcon} 
                    alt="Call" 
                    style={styles.responsiveIcon}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = '📞';
                      e.target.parentNode.appendChild(span);
                    }}
                  />
                  Call Customer
                </button>
                <button
                  type="button"
                  style={styles.emailButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#8B1FFF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#A237FF'}
                  onClick={() => window.location.href = `mailto:${selectedInquiry.email}`}
                  aria-label={`Email ${selectedInquiry.email}`}
                >
                  <img 
                    src={EmailIcon} 
                    alt="Email" 
                    style={styles.responsiveIcon}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = '✉️';
                      e.target.parentNode.appendChild(span);
                    }}
                  />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;