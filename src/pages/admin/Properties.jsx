import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import SVG icons
import SearchIcon from '../../assets/icons/Search-property.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import ViewIcon from '../../assets/icons/eye-close.svg'; 
import PreviousIcon from '../../assets/icons/PreviousIcon.svg';
import NextIcon from '../../assets/icons/NextIcon.svg';
import AscendingIcon from '../../assets/icons/ChevronLeft.svg';
import DescendingIcon from '../../assets/icons/ChevronRight.svg';
import DeleteActionIcon from '../../assets/icons/Button (1).svg';
import CloseIcon from '../../assets/icons/close.svg'; 


const INITIAL_PROPERTIES = [
  {
    id: 1,
    name: 'Luxury Villa in Beverly Hills',
    location: 'Baner, Pune',
    price: '₹ 70 Lakh',
    details: '3,000 sq ft 3 BHK Villa',
    status: 'Available',
    addedDate: '11-02-2026',
    bedrooms: '3',
    area: '3000',
    description: 'Beautiful luxury villa with modern amenities...',
    uploadedImages: [] 
  },
  {
    id: 2,
    name: 'Modern Downtown Apartment',
    location: 'Shingada Road, Suncity',
    price: '₹ 85 Lakh',
    details: '1,300 sq ft Apartment',
    status: 'Rented',
    addedDate: '11-02-2026'
  },
  {
    id: 3,
    name: 'Suburban Family Home',
    location: 'Thane Maharashtra',
    price: '₹ 70 Lakh',
    details: '3,000 sq ft 3 BHK Villa',
    status: 'Sold',
    addedDate: '11-02-2026'
  },
  {
    id: 4,
    name: 'Mountain View Estate',
    location: 'Wakad, Pune',
    price: '₹ 2 Crore',
    details: '1,300 sq ft Apartment',
    status: 'Available',
    addedDate: '11-02-2026'
  },
  {
    id: 5,
    name: 'Urban Loft',
    location: 'Hinjewadi, Pune',
    price: '₹ 70 Lakh',
    details: '2,500 sq ft Commercial',
    status: 'Rented',
    addedDate: '11-02-2026'
  },
];

const Properties = () => {
  
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem('properties');
    return savedProperties ? JSON.parse(savedProperties) : INITIAL_PROPERTIES;
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    return savedSearchTerm || '';
  });

  const [selectedProperties, setSelectedProperties] = useState(() => {
    const savedSelected = localStorage.getItem('selectedProperties');
    return savedSelected ? JSON.parse(savedSelected) : [];
  });

  const [statusFilter, setStatusFilter] = useState(() => {
    const savedFilter = localStorage.getItem('statusFilter');
    return savedFilter || 'All Status';
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });

  const [sortConfig, setSortConfig] = useState(() => {
    const savedSort = localStorage.getItem('sortConfig');
    return savedSort ? JSON.parse(savedSort) : { key: null, direction: 'asc' };
  });

  const [showModal, setShowModal] = useState(false);
  // Add these states near your other state declarations:
const [showViewModal, setShowViewModal] = useState(false);
const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalType, setModalType] = useState('add');
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    bedrooms: '',
    area: '',
    status: 'Available',
    description: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('selectedProperties', JSON.stringify(selectedProperties));
  }, [selectedProperties]);

  useEffect(() => {
    localStorage.setItem('statusFilter', statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('sortConfig', JSON.stringify(sortConfig));
  }, [sortConfig]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive items per page
  const getItemsPerPage = () => {
    if (windowWidth < 640) return 5;
    if (windowWidth < 1024) return 7;
    return 10;
  };
  
  const itemsPerPage = getItemsPerPage();

  // Sort properties
  const sortedProperties = [...properties].sort((a, b) => {
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

  // Filter properties based on search and status
  const filteredProperties = sortedProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);
  const totalProperties = filteredProperties.length;

  // Handle property selection
  const handleSelectProperty = (id) => {
    setSelectedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(propertyId => propertyId !== id)
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProperties.length === currentProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(currentProperties.map(property => property.id));
    }
  };

  // Handle delete selected
  const handleDeleteSelected = () => {
    if (selectedProperties.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProperties.length} property(ies)?`)) {
      setProperties(prev => prev.filter(property => !selectedProperties.includes(property.id)));
      setSelectedProperties([]);
    }
  };

  // Add this function near your other handler functions:
const handleViewProperty = (property) => {
  setSelectedProperty(property);
  setShowViewModal(true);
};

const handleCloseViewModal = () => {
  setShowViewModal(false);
  setSelectedProperty(null);
};

  // Handle delete single property
  const handleDeleteSingle = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(property => property.id !== id));
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

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setShowFilterDropdown(false);
    setCurrentPage(1);
  };

  // File upload handlers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setUploadedFiles(prev => [...prev, ...imageFiles]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Modal handlers
  const handleAddPropertyClick = () => {
    setModalType('add');
    setFormData({
      name: '',
      price: '',
      location: '',
      bedrooms: '',
      area: '',
      status: 'Available',
      description: ''
    });
    setUploadedFiles([]);
    setShowModal(true);
  };

  const handleEditPropertyClick = (property) => {
  setModalType('edit');
  setEditingProperty(property);

  const detailsParts = property.details.split(' ');
  const bedrooms = detailsParts[3] || ''; 
  
  setFormData({
    name: property.name,
    price: property.price.replace('₹ ', ''),
    location: property.location,
    bedrooms: bedrooms.replace('BHK', ''),
    area: property.area || property.details.split(' sq ft')[0],
    status: property.status,
    description: property.description || ''
  });
  
  // Set uploaded files if property has images
  if (property.uploadedImages && property.uploadedImages.length > 0) {
    setUploadedFiles(property.uploadedImages);
  } else {
    setUploadedFiles([]);
  }
  
  setShowModal(true);
};

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProperty(null);
    setUploadedFiles([]);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  console.log('Uploaded files:', uploadedFiles);
  
  if (modalType === 'add') {
    const newProperty = {
      id: properties.length + 1,
      name: formData.name,
      location: formData.location,
      price: `₹ ${formData.price}`,
      details: `${formData.area} sq ft ${formData.bedrooms} BHK Villa`,
      status: formData.status,
      addedDate: new Date().toLocaleDateString('en-GB'),
      bedrooms: formData.bedrooms,
      area: formData.area,
      description: formData.description,
      uploadedImages: uploadedFiles // Make sure this saves the uploaded files
    };
    
    setProperties(prev => [...prev, newProperty]);
  } else {
    setProperties(prev => prev.map(property => 
      property.id === editingProperty.id 
        ? {
            ...property,
            name: formData.name,
            location: formData.location,
            price: `₹ ${formData.price}`,
            details: `${formData.area} sq ft ${formData.bedrooms} BHK Villa`,
            status: formData.status,
            bedrooms: formData.bedrooms,
            area: formData.area,
            description: formData.description,
            uploadedImages: uploadedFiles // Make sure this updates the uploaded files
          }
        : property
    ));
  }
  
  handleCloseModal();
};

  // Get status button styles based on status
  const getStatusButtonStyle = (status) => {
    switch(status) {
      case 'Available': 
        return { 
          backgroundColor: '#C5FAC9', 
          color: '#151816',
        };
      case 'Rented': 
        return { 
          backgroundColor: '#E9F8FF', 
          color: '#272A2F',
        };
      case 'Sold': 
        return { 
          backgroundColor: '#FFBBBB', 
          color: '#282425',
        };
      default: 
        return { 
          backgroundColor: '#E5E7EB', 
          color: '#374151',
        };
    }
  };

  // CSS Styles with responsive adjustments
  // CSS Styles with responsive adjustments
const styles = {
  container: {
    padding: windowWidth < 640 ? '16px' : windowWidth < 1024 ? '24px' : '42px',
    minHeight: '100vh',
    fontFamily: 'Montserrat, Arial, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
  },
  headerRow: {
    display: 'flex',
    flexDirection: windowWidth < 768 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: windowWidth < 768 ? 'flex-start' : 'center',
    marginBottom: '24px',
    gap: '16px',
    width: '100%',
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontSize: windowWidth < 640 ? '20px' : windowWidth < 768 ? '22px' : '24px',
    fontWeight: 700,
    color: '#1E293B',
    margin: '0 0 8px 0',
    fontFamily: 'Montserrat',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: windowWidth < 640 ? '12px' : '14px',
    color: '#3F74E2',
    margin: 0,
    fontWeight: 500,
    fontFamily: 'Montserrat',
    lineHeight: '1.4',
  },
  addPropertyButton: {
    width: windowWidth < 768 ? '100%' : 'auto',
    minWidth: '140px',
    height: windowWidth < 640 ? '40px' : '46px',
    backgroundColor: '#A237FF',
    color: 'white',
    border: 'none',
    borderRadius: '7px',
    fontSize: windowWidth < 640 ? '13px' : '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: windowWidth < 640 ? '8px 12px' : '10px 16px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Montserrat',
    flexShrink: 0,
  },
  whiteSection: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '11px',
    border: '1px solid #E2E8F0',
    padding: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '16px' : '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  searchRow: {
    display: 'flex',
    flexDirection: windowWidth < 768 ? 'column' : 'row',
    alignItems: windowWidth < 768 ? 'stretch' : 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '12px',
    position: 'relative',
    width: '100%',
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: windowWidth < 768 ? '100%' : '200px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '14px',
    height: '14px',
  },
  searchInput: {
    width: '100%',
    height: windowWidth < 640 ? '36px' : '40px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    padding: '8px 12px 8px 36px',
    fontSize: '13px',
    color: '#1E293B',
    outline: 'none',
    backgroundColor: 'white',
    fontFamily: 'Montserrat',
    boxSizing: 'border-box',
  },
  controlsGroup: {
    display: 'flex',
    flexDirection: windowWidth < 640 ? 'column' : 'row',
    gap: '12px',
    alignItems: 'stretch',
    width: windowWidth < 768 ? '100%' : 'auto',
  },
  filterButtonContainer: {
    position: 'relative',
    width: windowWidth < 768 ? '100%' : 'auto',
    minWidth: windowWidth < 768 ? '100%' : '140px',
  },
  allFilterButton: {
    width: '100%',
    height: windowWidth < 640 ? '36px' : '40px',
    backgroundColor: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '5px',
    fontSize: '13px',
    color: '#475569',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    transition: 'border-color 0.3s ease',
    fontFamily: 'Montserrat',
    whiteSpace: 'nowrap',
  },
  filterDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    backgroundColor: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    overflow: 'hidden',
    minWidth: '100%',
  },
  filterOption: {
    padding: '10px 12px',
    fontSize: '13px',
    color: '#374151',
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    borderBottom: '1px solid #F3F4F6',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'white',
  },
  filterOptionActive: {
    backgroundColor: '#F3F4F6',
    fontWeight: 600,
    color: '#1E293B',
  },
  deleteButton: {
    width: '100%',
    height: windowWidth < 640 ? '36px' : '40px',
    backgroundColor: '#FF3C3C',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '8px 12px',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Montserrat',
    whiteSpace: 'nowrap',
    minWidth: '120px',
  },
  disabledDeleteButton: {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
    cursor: 'not-allowed',
  },
  showingText: {
    fontSize: '13px',
    color: '#64748B',
    marginBottom: '12px',
    fontFamily: 'Montserrat',
    textAlign: windowWidth < 768 ? 'center' : 'left',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: '20px',
    WebkitOverflowScrolling: 'touch',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: windowWidth < 1024 ? '800px' : '100%',
  },
  tableHeaderRow: {
    backgroundColor: '#F9FAFB',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  tableHeaderCell: {
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    whiteSpace: 'nowrap',
    fontFamily: 'Montserrat',
    padding: '12px',
    border: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  headerCellContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sortIconsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '4px',
  },
  checkboxHeaderCell: {
    width: '40px',
    minWidth: '40px',
    maxWidth: '40px',
  },
  checkboxCell: {
    width: '40px',
    minWidth: '40px',
    maxWidth: '40px',
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #E5E7EB',
  },
  propertyNameHeaderCell: {
    minWidth: windowWidth < 1024 ? '180px' : '200px',
  },
  propertyNameCell: {
    padding: '12px',
    border: '1px solid #E5E7EB',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '140%',
    minWidth: windowWidth < 1024 ? '180px' : '200px',
  },
  locationHeaderCell: {
    minWidth: windowWidth < 1024 ? '150px' : '180px',
  },
  locationCell: {
    padding: '12px',
    border: '1px solid #E5E7EB',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '140%',
    minWidth: windowWidth < 1024 ? '150px' : '180px',
  },
  priceHeaderCell: {
    minWidth: windowWidth < 1024 ? '100px' : '120px',
  },
  priceCell: {
    padding: '12px',
    border: '1px solid #E5E7EB',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '140%',
    minWidth: windowWidth < 1024 ? '100px' : '120px',
  },
  detailsHeaderCell: {
    minWidth: windowWidth < 1024 ? '150px' : '200px',
  },
  detailsCell: {
    padding: '12px',
    border: '1px solid #E5E7EB',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '140%',
    minWidth: windowWidth < 1024 ? '150px' : '200px',
  },
  statusHeaderCell: {
    minWidth: windowWidth < 1024 ? '100px' : '120px',
  },
  statusCell: {
    padding: '12px',
    border: '1px solid #E5E7EB',
    minWidth: windowWidth < 1024 ? '100px' : '120px',
  },
  addedDateHeaderCell: {
    minWidth: windowWidth < 1024 ? '100px' : '120px',
  },
  addedDateCell: {
    padding: '12px',
    border: '1px solid #E5E7EB',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '140%',
    minWidth: windowWidth < 1024 ? '100px' : '120px',
  },
  actionsHeaderCell: {
    minWidth: '100px',
  },
  actionsCell: {
    padding: '12px',
    border: '1px solid #E5E7EB',
    textAlign: 'center',
    minWidth: '100px',
  },
  sortIcon: {
    width: '10px',
    height: '10px',
    cursor: 'pointer',
    opacity: 0.5,
    margin: '1px 0',
  },
  activeSortIcon: {
    opacity: 1,
  },
  checkbox: {
    width: '16px',
    height: '16px',
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
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'default',
    fontFamily: 'Montserrat',
    padding: '6px 10px',
    width: '100%',
    height: '32px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
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
    minWidth: '28px',
    minHeight: '28px',
  },
  editButton: {
    color: '#3B82F6',
  },
  deleteActionButton: {
    color: '#EF4444',
  },
  paginationContainer: {
    display: 'flex',
    flexDirection: windowWidth < 768 ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: windowWidth < 768 ? '12px' : '0',
    width: '100%',
  },
  paginationInfo: {
    fontSize: '13px',
    color: '#64748B',
    fontFamily: 'Montserrat',
    textAlign: windowWidth < 768 ? 'center' : 'left',
    order: windowWidth < 768 ? 2 : 1,
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
    justifyContent: windowWidth < 768 ? 'center' : 'flex-end',
    order: windowWidth < 768 ? 1 : 2,
  },
  pageNumberButton: {
    minWidth: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '13px',
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
    color: '#000000',
    fontFamily: 'Montserrat',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Modal styles - Responsive
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
    padding: windowWidth < 640 ? '8px' : '16px',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: windowWidth < 640 ? '95%' : windowWidth < 768 ? '90%' : '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    padding: windowWidth < 640 ? '12px 16px' : '16px 24px',
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
    fontSize: windowWidth < 640 ? '18px' : '20px',
    fontWeight: 600,
    color: '#1E293B',
    margin: 0,
    fontFamily: 'Montserrat',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  },
  modalBody: {
    padding: windowWidth < 640 ? '12px 16px' : '16px 24px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '6px',
    fontFamily: 'Montserrat',
  },
  formInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#1E293B',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'Montserrat',
    boxSizing: 'border-box',
  },
  formSelect: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#1E293B',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    boxSizing: 'border-box',
  },
  fieldValue: {
    fontSize: '14px',
    color: '#1F2937',
    fontFamily: 'Montserrat',
    padding: '10px 12px',
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-word',
  },
  modalFooter: {
    padding: windowWidth < 640 ? '12px 16px' : '16px 24px',
    borderTop: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: windowWidth < 640 ? 'column-reverse' : 'row',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  submitButton: {
    padding: windowWidth < 640 ? '10px 16px' : '10px 20px',
    backgroundColor: '#A237FF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    transition: 'background-color 0.3s ease',
    width: windowWidth < 640 ? '100%' : 'auto',
  },
  cancelButton: {
    padding: windowWidth < 640 ? '10px 16px' : '10px 20px',
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    transition: 'all 0.3s ease',
    width: windowWidth < 640 ? '100%' : 'auto',
  },
  textArea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#1E293B',
    outline: 'none',
    fontFamily: 'Montserrat',
    resize: 'vertical',
    minHeight: '80px',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    flexDirection: windowWidth < 640 ? 'column' : 'row',
    gap: '12px',
    marginBottom: '16px',
  },
  col: {
    flex: 1,
    width: windowWidth < 640 ? '100%' : 'auto',
  },
  // Upload section styles
  uploadSection: {
    marginBottom: '16px',
  },
  uploadLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '6px',
    fontFamily: 'Montserrat',
  },
  uploadContainer: {
    width: '100%',
    minHeight: '120px',
    border: '1px dashed #D1D5DB',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
    boxSizing: 'border-box',
  },
  uploadContainerHover: {
    borderColor: '#A237FF',
    backgroundColor: '#F9F5FF',
  },
  uploadIcon: {
    width: '32px',
    height: '32px',
    color: '#9CA3AF',
  },
  uploadText: {
    fontSize: '13px',
    color: '#6B7280',
    fontWeight: 500,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  uploadSubtext: {
    fontSize: '11px',
    color: '#9CA3AF',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  fileInput: {
    display: 'none',
  },
  // Responsive icons
  responsiveIcon: {
    width: windowWidth < 640 ? '16px' : '20px',
    height: windowWidth < 640 ? '16px' : '20px',
  },
  // View Modal styles
  viewModalOverlay: {
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
    padding: windowWidth < 640 ? '8px' : '16px',
  },
  viewModalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: windowWidth < 640 ? '95%' : windowWidth < 768 ? '90%' : '600px',
    maxHeight: '90vh',
    position: 'relative',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    border: '1px solid #E5E7EB',
    padding: windowWidth < 640 ? '12px 16px' : '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflowY: 'auto',
  },
};

  // Filter options
  const filterOptions = ['All Status', 'Available', 'Rented', 'Sold'];

  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        <div style={styles.headerText}>
          <h1 style={styles.title}>Property Management</h1>
          <p style={styles.subtitle}>Manage all your real estate listings</p>
        </div>
        
        <button
          onClick={handleAddPropertyClick}
          style={styles.addPropertyButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#8A2BE2'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#A237FF'}
        >
          Add Property
        </button>
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
            <div style={styles.filterButtonContainer}>
              <button 
                style={styles.allFilterButton}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
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
                  <span>{statusFilter}</span>
                </div>
                <img 
                  src={DescendingIcon} 
                  alt="Dropdown" 
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    transform: showFilterDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              </button>
              
              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div style={styles.filterDropdown}>
                  {filterOptions.map((option) => (
                    <div
                      key={option}
                      style={{
                        ...styles.filterOption,
                        ...(statusFilter === option && styles.filterOptionActive),
                      }}
                      onClick={() => handleStatusFilterChange(option)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 
                        statusFilter === option ? '#F3F4F6' : 'white'
                      }
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleDeleteSelected}
              disabled={selectedProperties.length === 0}
              style={{
                ...styles.deleteButton,
                ...(selectedProperties.length === 0 && styles.disabledDeleteButton),
              }}
              onMouseEnter={(e) => {
                if (selectedProperties.length > 0) {
                  e.target.style.backgroundColor = '#DC2626';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedProperties.length > 0) {
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
              Delete ({selectedProperties.length})
            </button>
          </div>
        </div>

        {/* Close dropdown when clicking outside */}
        {showFilterDropdown && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
            }}
            onClick={() => setShowFilterDropdown(false)}
          />
        )}

        {/* Table Container with Scroll and Grid Lines */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeaderRow}>
              <tr>
                {/* Checkbox Column */}
                <th style={{ ...styles.tableHeaderCell, ...styles.checkboxHeaderCell }}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={selectedProperties.length === currentProperties.length && currentProperties.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                
                {/* Property Name Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.propertyNameHeaderCell }}
                  onClick={() => handleSort('name')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Property Name</div>
                    <div style={styles.sortIconsContainer}>
                      <img 
                        src={AscendingIcon} 
                        alt="Sort Ascending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'name' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                        }}
                      />
                      <img 
                        src={DescendingIcon} 
                        alt="Sort Descending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'name' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                        }}
                      />
                    </div>
                  </div>
                </th>
                
                {/* Location Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.locationHeaderCell }}
                  onClick={() => handleSort('location')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Location</div>
                    <div style={styles.sortIconsContainer}>
                      <img 
                        src={AscendingIcon} 
                        alt="Sort Ascending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'location' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                        }}
                      />
                      <img 
                        src={DescendingIcon} 
                        alt="Sort Descending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'location' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                        }}
                      />
                    </div>
                  </div>
                </th>
                
                {/* Price Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.priceHeaderCell }}
                  onClick={() => handleSort('price')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Price</div>
                    <div style={styles.sortIconsContainer}>
                      <img 
                        src={AscendingIcon} 
                        alt="Sort Ascending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'price' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                        }}
                      />
                      <img 
                        src={DescendingIcon} 
                        alt="Sort Descending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'price' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                        }}
                      />
                    </div>
                  </div>
                </th>
                
                {/* Details Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.detailsHeaderCell }}
                >
                  <div style={styles.headerCellContent}>
                    <div>Details</div>
                  </div>
                </th>
                
                {/* Status Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.statusHeaderCell }}
                  onClick={() => handleSort('status')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Status</div>
                    <div style={styles.sortIconsContainer}>
                      <img 
                        src={AscendingIcon} 
                        alt="Sort Ascending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'status' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                        }}
                      />
                      <img 
                        src={DescendingIcon} 
                        alt="Sort Descending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'status' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                        }}
                      />
                    </div>
                  </div>
                </th>
                
                {/* Added Date Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.addedDateHeaderCell }}
                  onClick={() => handleSort('addedDate')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Added Date</div>
                    <div style={styles.sortIconsContainer}>
                      <img 
                        src={AscendingIcon} 
                        alt="Sort Ascending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'addedDate' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                        }}
                      />
                      <img 
                        src={DescendingIcon} 
                        alt="Sort Descending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'addedDate' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                        }}
                      />
                    </div>
                  </div>
                </th>
                
                {/* Actions Column */}
                <th style={{ ...styles.tableHeaderCell, ...styles.actionsHeaderCell }}>
                  <div style={styles.headerCellContent}>
                    <div>Actions</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.map((property) => {
                const statusStyle = getStatusButtonStyle(property.status);
                return (
                  <tr 
                    key={property.id}
                    style={{ 
                      transition: 'background-color 0.3s ease',
                      height: '62px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {/* Checkbox Cell */}
                    <td style={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        style={styles.checkbox}
                        checked={selectedProperties.includes(property.id)}
                        onChange={() => handleSelectProperty(property.id)}
                      />
                    </td>
                    
                    {/* Property Name Cell */}
                    <td style={styles.propertyNameCell}>
                      {property.name}
                    </td>
                    
                    {/* Location Cell */}
                    <td style={styles.locationCell}>
                      {property.location}
                    </td>
                    
                    {/* Price Cell */}
                    <td style={styles.priceCell}>
                      {property.price}
                    </td>
                    
                    {/* Details Cell */}
                    <td style={styles.detailsCell}>
                      {property.details}
                    </td>
                    
                    {/* Status Cell */}
                    <td style={styles.statusCell}>
                      <div 
                        style={{
                          ...styles.statusButton,
                          ...statusStyle,
                        }}
                      >
                        {property.status}
                      </div>
                    </td>
                    
                    {/* Added Date Cell */}
                    <td style={styles.addedDateCell}>
                      {property.addedDate}
                    </td>
                    
                    {/* Actions Cell */}
                    <td style={styles.actionsCell}>
                      <div style={styles.actionsContainer}>
                        {/* Add View Button */}
    <button 
      style={{ ...styles.actionButton, ...styles.viewButton }}
      onClick={() => handleViewProperty(property)}
      aria-label="View property"
      onMouseEnter={(e) => e.target.style.backgroundColor = '#EFF6FF'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
    >
      <img 
        src={ViewIcon} 
        alt="View" 
        style={styles.responsiveIcon}
        onError={(e) => {
          e.target.style.display = 'none';
          const span = document.createElement('span');
          span.textContent = '👁️';
          e.target.parentNode.appendChild(span);
        }}
      />
    </button>
    
                        <button 
                          style={{ ...styles.actionButton, ...styles.editButton }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#EFF6FF'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Edit"
                          onClick={() => handleEditPropertyClick(property)}
                        >
                          <img 
                            src={EditIcon} 
                            alt="Edit" 
                            style={styles.responsiveIcon}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const span = document.createElement('span');
                              span.textContent = '✏️';
                              e.target.parentNode.appendChild(span);
                            }}
                          />
                        </button>
                        <button 
                          style={{ ...styles.actionButton, ...styles.deleteActionButton }}
                          onClick={() => handleDeleteSingle(property.id)}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Delete"
                        >
                          <img 
                            src={DeleteActionIcon} 
                            alt="Delete" 
                            style={styles.responsiveIcon}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const span = document.createElement('span');
                              span.textContent = '🗑️';
                              e.target.parentNode.appendChild(span);
                            }}
                          />
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
    Showing {startIndex + 1} - {Math.min(endIndex, totalProperties)} out of {totalProperties}
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

    {/* Page numbers in the middle with button boxes - fixed numbers like 1 2 - 9 10 */}
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

      {/* Modal for Add/Edit Property */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {modalType === 'add' ? 'Add Property' : 'Edit Property'}
              </h2>
              <button 
                style={styles.closeButton}
                onClick={handleCloseModal}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <img 
                  src={CloseIcon} 
                  alt="Close" 
                  style={styles.responsiveIcon}
                />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.modalBody}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Property Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.formInput}
                    required
                  />
                </div>
                
                <div style={styles.row}>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., 85 Lakh"
                        required
                      />
                    </div>
                  </div>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., Pune"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div style={styles.row}>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., 3"
                        required
                      />
                    </div>
                  </div>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Area (sq ft)</label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., 3000"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={styles.formSelect}
                  >
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                
                {/* Upload Section */}
                <div style={styles.uploadSection}>
                  <label style={styles.uploadLabel}>Upload Images</label>
                  <div
                    style={{
                      ...styles.uploadContainer,
                      ...(isDragging && styles.uploadContainerHover),
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload').click()}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#A237FF'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
                  >
                    <svg
                      style={styles.uploadIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    
                    <div style={styles.uploadText}>Click to upload images</div>
                    <div style={styles.uploadSubtext}>PNG, JPG up to 10 MB</div>
                    
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/jpg"
                      style={styles.fileInput}
                      onChange={handleFileUpload}
                    />
                  </div>
                  
                  {/* Show uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontFamily: 'Montserrat' }}>
                        {uploadedFiles.length} file(s) selected
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              backgroundColor: '#F3F4F6',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontFamily: 'Montserrat',
                              maxWidth: '100%',
                              overflow: 'hidden',
                            }}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(index);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#EF4444',
                                fontSize: '14px',
                                padding: '0',
                                flexShrink: 0,
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={styles.textArea}
                    placeholder="Enter property description..."
                  />
                </div>
              </div>
              
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={handleCloseModal}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#8A2BE2'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#A237FF'}
                >
                  {modalType === 'add' ? 'Add Property' : 'Update Property'}
                </button>
              </div>

            </form>
          </div>
        </div>
        
      )}
      {/* View Property Modal - Use same structure as add/edit modal */}
{showViewModal && selectedProperty && (
  <div style={styles.modalOverlay} onClick={handleCloseViewModal}>
    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <div style={styles.modalHeader}>
        <h2 style={styles.modalTitle}>Property Details</h2>
        <button 
          style={styles.closeButton}
          onClick={handleCloseViewModal}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          aria-label="Close modal"
        >
          <img 
            src={CloseIcon} 
            alt="Close" 
            style={styles.responsiveIcon}
          />
        </button>
      </div>
      
      <div style={styles.modalBody}>
        {/* Property Name */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Property Name</label>
          <div style={styles.fieldValue}>{selectedProperty.name}</div>
        </div>
        
        {/* Price and Location */}
        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Price</label>
              <div style={styles.fieldValue}>{selectedProperty.price}</div>
            </div>
          </div>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Location</label>
              <div style={styles.fieldValue}>{selectedProperty.location}</div>
            </div>
          </div>
        </div>
        
        {/* Bedrooms and Area */}
        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Bedrooms</label>
              <div style={styles.fieldValue}>
                {selectedProperty.bedrooms || selectedProperty.details?.split(' ')[3]?.replace('BHK', '') || 'N/A'} BHK
              </div>
            </div>
          </div>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Area (sq ft)</label>
              <div style={styles.fieldValue}>
                {selectedProperty.area || selectedProperty.details?.split(' sq ft')[0] || 'N/A'} sq ft
              </div>
            </div>
          </div>
        </div>
        
        {/* Status and Added Date */}
        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Status</label>
              <div style={styles.fieldValue}>
                <div 
                  style={{
                    ...styles.statusButton,
                    ...getStatusButtonStyle(selectedProperty.status),
                    justifyContent: 'center',
                    cursor: 'default',
                  }}
                >
                  {selectedProperty.status}
                </div>
              </div>
            </div>
          </div>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Added Date</label>
              <div style={styles.fieldValue}>{selectedProperty.addedDate}</div>
            </div>
          </div>
        </div>
        
        {/* Details */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Details</label>
          <div style={styles.fieldValue}>{selectedProperty.details}</div>
        </div>
        
        {/* Uploaded Images */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Uploaded Images</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '8px'
          }}>
            {selectedProperty.uploadedImages && selectedProperty.uploadedImages.length > 0 ? (
              selectedProperty.uploadedImages.map((file, index) => (
                <div key={index} style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '8px',
                  minWidth: '100px',
                  backgroundColor: '#F9FAFB',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {file.type && file.type.startsWith('image/') ? (
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '4px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={file.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '4px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>📄</span>
                    </div>
                  )}
                  <div style={{
                    fontSize: '12px',
                    color: '#374151',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100px',
                    textAlign: 'center'
                  }}>
                    {file.name}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                padding: '12px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                border: '1px dashed #E5E7EB',
                width: '100%',
                textAlign: 'center',
                color: '#6B7280',
                fontFamily: 'Montserrat'
              }}>
                No images uploaded
              </div>
            )}
          </div>
        </div>
        
        {/* Description */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Description</label>
          <div style={{
            ...styles.fieldValue,
            minHeight: '100px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
            padding: '12px 16px'
          }}>
            {selectedProperty.description || 'No description provided'}
          </div>
        </div>
        
        {/* Modal Footer with Close Button */}
        <div style={styles.modalFooter}>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={handleCloseViewModal}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Properties;