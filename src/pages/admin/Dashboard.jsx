import React, { useState, useEffect } from "react";

// Icons
import TotalPropertiesIcon from "../../assets/icons/Total Properties1.svg";
import TotalInquiriesIcon from "../../assets/icons/Total Inquiries1.svg";
import AvailablePropertiesIcon from "../../assets/icons/Available Properties1.svg";
import ActiveLeadsIcon from "../../assets/icons/Active Leads1.svg";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      id: 1,
      title: "Total Properties",
      value: 0,
      change: "No data",
      icon: TotalPropertiesIcon,
      bgColor: "#B4F8FF",
    },
    {
      id: 2,
      title: "Total Inquiries",
      value: 0,
      change: "No data",
      icon: TotalInquiriesIcon,
      bgColor: "#B4FFD9",
    },
    {
      id: 3,
      title: "Available Properties",
      value: 0,
      change: "0 properties",
      icon: AvailablePropertiesIcon,
      bgColor: "#FFE8B4",
    },
    {
      id: 4,
      title: "Active Leads",
      value: 0,
      change: "Pending follow-up",
      icon: ActiveLeadsIcon,
      bgColor: "#B4FFD9",
    },
  ]);

  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load and calculate dashboard data
  const loadDashboardData = () => {
    try {
      // Get properties data
      const propertiesData = localStorage.getItem("properties");
      const properties = propertiesData ? JSON.parse(propertiesData) : [];

      // Get inquiries data - combine regular inquiries and contact form submissions
      const inquiriesData = localStorage.getItem("inquiries");
      const contactSubmissionsData = localStorage.getItem(
        "contactFormSubmissions",
      );

      const regularInquiries = inquiriesData ? JSON.parse(inquiriesData) : [];
      const contactSubmissions = contactSubmissionsData
        ? JSON.parse(contactSubmissionsData)
        : [];

      // Transform contact submissions to inquiry format
      const transformedContactInquiries = contactSubmissions.map((contact) => ({
        id: contact.id,
        name: contact.fullName,
        email: contact.email,
        propertyInterested:
          contact.propertyInterested || "Contact Form Inquiry",
        phone: contact.phone,
        inquiryDate: formatTimestampToDate(contact.timestamp), // For display
        timestamp: contact.timestamp, // Keep original ISO timestamp for sorting
        status: contact.status || "New",
        message: contact.message,
        source: "contact-form",
      }));

      // Add timestamp to regular inquiries if they don't have it
      const regularInquiriesWithTimestamp = regularInquiries.map((inq) => ({
        ...inq,
        timestamp: inq.timestamp || null, // Regular inquiries might not have timestamp
      }));

      // Merge all inquiries - contact form first since they're likely newer
      const allInquiries = [
        ...transformedContactInquiries,
        ...regularInquiriesWithTimestamp,
      ];

      // Calculate stats
      const totalProperties = properties.length;
      const availableProperties = properties.filter(
        (p) => p.status === "Available",
      ).length;
      const totalInquiries = allInquiries.length;
      const activeLeads = allInquiries.filter(
        (i) => i.status === "New" || i.status === "Contacted",
      ).length;

      // Update stats
      setStats([
        {
          id: 1,
          title: "Total Properties",
          value: totalProperties,
          change:
            totalProperties > 0
              ? `${totalProperties} total properties`
              : "No properties yet",
          icon: TotalPropertiesIcon,
          bgColor: "#B4F8FF",
        },
        {
          id: 2,
          title: "Total Inquiries",
          value: totalInquiries,
          change:
            totalInquiries > 0
              ? `${totalInquiries} total inquiries`
              : "No inquiries yet",
          icon: TotalInquiriesIcon,
          bgColor: "#B4FFD9",
        },
        {
          id: 3,
          title: "Available Properties",
          value: availableProperties,
          change: `${availableProperties} properties available`,
          icon: AvailablePropertiesIcon,
          bgColor: "#FFE8B4",
        },
        {
          id: 4,
          title: "Active Leads",
          value: activeLeads,
          change: `${activeLeads} leads pending follow-up`,
          icon: ActiveLeadsIcon,
          bgColor: "#B4FFD9",
        },
      ]);

      // Sort and get recent properties (top 3 most recent)
      console.log("All properties:", properties);

      const sortedProperties = [...properties]
        .sort((a, b) => {
          const dateA = parseDate(a.addedDate);
          const dateB = parseDate(b.addedDate);
          console.log(
            `Comparing: ${a.name} (${a.addedDate}) = ${dateA} vs ${b.name} (${b.addedDate}) = ${dateB}`,
          );
          return dateB - dateA; // Most recent first (descending order)
        })
        .slice(0, 3);

      console.log("Sorted properties (top 3):", sortedProperties);

      setRecentProperties(
        sortedProperties.map((prop) => ({
          id: prop.id,
          name: prop.name,
          location: prop.location,
          date: prop.addedDate,
          price: prop.price,
          details: prop.details,
          status: prop.status,
        })),
      );

      // Sort and get recent inquiries (top 3 most recent)
      const sortedInquiries = [...allInquiries]
        .sort((a, b) => {
          // Use timestamp if available (contact form entries have ISO timestamp)
          if (a.timestamp && b.timestamp) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }
          // If only one has timestamp, prioritize it
          if (a.timestamp) return -1;
          if (b.timestamp) return 1;
          // Otherwise parse inquiryDate
          const dateA = parseDate(a.inquiryDate);
          const dateB = parseDate(b.inquiryDate);
          return dateB - dateA; // Most recent first (descending order)
        })
        .slice(0, 3);

      setRecentInquiries(
        sortedInquiries.map((inq) => ({
          id: inq.id,
          name: inq.name,
          property: inq.propertyInterested,
          status: inq.status,
        })),
      );
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  // Helper function to parse date (handles DD-MM-YYYY, DD/MM/YYYY formats and ISO timestamps)
  const parseDate = (dateString) => {
    if (!dateString) return new Date(0);

    // Handle DD-MM-YYYY format (from manual entries)
    if (typeof dateString === "string" && dateString.includes("-")) {
      const parts = dateString.split("-");
      if (parts.length === 3 && parts[0].length <= 2) {
        // This is DD-MM-YYYY format
        const [day, month, year] = parts;
        // Create date at noon to avoid timezone issues
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          12,
          0,
          0,
        );
      }
    }

    // Handle DD/MM/YYYY format (alternative format)
    if (typeof dateString === "string" && dateString.includes("/")) {
      const parts = dateString.split("/");
      if (parts.length === 3 && parts[0].length <= 2) {
        // This is DD/MM/YYYY format
        const [day, month, year] = parts;
        // Create date at noon to avoid timezone issues
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          12,
          0,
          0,
        );
      }
    }

    // Handle ISO timestamp (from contact form submissions)
    const timestamp = new Date(dateString);
    if (!isNaN(timestamp.getTime())) {
      return timestamp;
    }

    // Fallback
    return new Date(0);
  };

  // Helper function to format ISO timestamp to DD-MM-YYYY
  const formatTimestampToDate = (timestamp) => {
    if (!timestamp)
      return new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Load data on mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Refresh data periodically and on storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadDashboardData();
    };

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);

    // Refresh every 3 seconds to catch same-tab updates
    const intervalId = setInterval(loadDashboardData, 3000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const styles = {
    container: {
      padding: windowWidth < 640 ? "16px" : "20px",
      maxWidth: "100%",
      overflowX: "hidden",
      boxSizing: "border-box",
      fontFamily: "Montserrat, Arial, sans-serif",
    },

    /* Welcome */
    welcomeTitle: {
      fontSize:
        windowWidth < 640 ? "20px" : windowWidth < 768 ? "22px" : "24px",
      fontWeight: 700,
      marginBottom: "8px",
      fontFamily: "Montserrat",
    },
    welcomeSubtitle: {
      fontSize:
        windowWidth < 640 ? "12px" : windowWidth < 768 ? "13px" : "14px",
      color: "#666",
      marginBottom: "30px",
      fontFamily: "Montserrat",
    },

    /* Stats */
    statsGrid: {
      display: "grid",
      gridTemplateColumns:
        windowWidth < 640
          ? "1fr"
          : windowWidth < 1024
            ? "repeat(2, 1fr)"
            : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: windowWidth < 640 ? "15px" : "20px",
      marginBottom: "30px",
    },
    statCard: {
      background: "#fff",
      borderRadius: "15px",
      padding: windowWidth < 640 ? "15px" : "20px",
      display: "flex",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      minHeight: windowWidth < 640 ? "100px" : "120px",
      boxSizing: "border-box",
    },
    statIconBox: {
      width: windowWidth < 640 ? "40px" : "48px",
      height: windowWidth < 640 ? "40px" : "48px",
      borderRadius: "12px",
      background: "#F4F6FA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginLeft: "15px",
    },
    statContent: {
      flex: 1,
      minWidth: 0,
    },
    statTitle: {
      fontSize:
        windowWidth < 640 ? "11px" : windowWidth < 768 ? "12px" : "13px",
      color: "#666",
      marginBottom: "8px",
      fontFamily: "Montserrat",
    },
    statValue: {
      fontSize:
        windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
      fontWeight: 700,
      marginBottom: "4px",
      fontFamily: "Montserrat",
    },
    statChange: {
      fontSize:
        windowWidth < 640 ? "10px" : windowWidth < 768 ? "11px" : "12px",
      color: "#666",
      fontFamily: "Montserrat",
    },

    /* Tables */
    tableCard: {
      background: "#fff",
      borderRadius: "15px",
      padding: windowWidth < 640 ? "15px" : windowWidth < 768 ? "20px" : "30px",
      border: "1px solid #E0E0E0",
      marginBottom: "30px",
      width: "100%",
      overflowX: "auto",
      boxSizing: "border-box",
    },
    tableTitle: {
      fontSize:
        windowWidth < 640 ? "14px" : windowWidth < 768 ? "15px" : "16px",
      fontWeight: 600,
      marginBottom: "20px",
      fontFamily: "Montserrat",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      minWidth: windowWidth < 640 ? "500px" : "600px",
    },
    th: {
      padding:
        windowWidth < 640
          ? "10px 12px"
          : windowWidth < 768
            ? "12px 15px"
            : "14px 20px",
      fontSize:
        windowWidth < 640 ? "10px" : windowWidth < 768 ? "11px" : "12px",
      fontWeight: 600,
      background: "#EBF2FF",
      color: "#666",
      textAlign: "left",
      whiteSpace: "nowrap",
      fontFamily: "Montserrat",
    },
    td: {
      padding:
        windowWidth < 640
          ? "10px 12px"
          : windowWidth < 768
            ? "12px 15px"
            : "14px 20px",
      fontSize:
        windowWidth < 640 ? "12px" : windowWidth < 768 ? "13px" : "14px",
      verticalAlign: "middle",
      wordBreak: "break-word",
      fontFamily: "Montserrat",
    },

    /* Properties Card */
    propertyCard: {
      background: "#EBF2FF",
      borderRadius: "10px",
      padding:
        windowWidth < 640
          ? "12px 15px"
          : windowWidth < 768
            ? "14px 18px"
            : "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "10px",
    },
    propertyInfo: {
      flex: 1,
      minWidth: windowWidth < 640 ? "100%" : "250px",
    },
    propertyName: {
      fontWeight: 600,
      fontSize:
        windowWidth < 640 ? "13px" : windowWidth < 768 ? "14px" : "16px",
      marginBottom: "4px",
      fontFamily: "Montserrat",
      color: "#1E293B",
    },
    propertyLocation: {
      fontSize:
        windowWidth < 640 ? "11px" : windowWidth < 768 ? "12px" : "13px",
      color: "#64748B",
      fontFamily: "Montserrat",
      marginBottom: "2px",
    },
    propertyDetails: {
      fontSize:
        windowWidth < 640 ? "11px" : windowWidth < 768 ? "12px" : "13px",
      color: "#64748B",
      fontFamily: "Montserrat",
    },
    propertyDate: {
      fontSize:
        windowWidth < 640 ? "10px" : windowWidth < 768 ? "11px" : "12px",
      color: "#6B7280",
      fontFamily: "Montserrat",
    },
    propertyPriceStatus: {
      display: "flex",
      alignItems: "center",
      gap: windowWidth < 640 ? "10px" : windowWidth < 768 ? "20px" : "30px",
      flexWrap: "wrap",
      width: windowWidth < 640 ? "100%" : "auto",
      justifyContent: windowWidth < 640 ? "space-between" : "flex-start",
    },
    propertyPrice: {
      fontWeight: "600",
      fontSize:
        windowWidth < 640 ? "14px" : windowWidth < 768 ? "15px" : "16px",
      whiteSpace: "nowrap",
      fontFamily: "Montserrat",
      color: "#1E293B",
    },
    statusButton: (status) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth:
        windowWidth < 640 ? "80px" : windowWidth < 768 ? "95px" : "110px",
      height: windowWidth < 640 ? "32px" : windowWidth < 768 ? "36px" : "40px",
      borderRadius: "8px",
      padding:
        windowWidth < 640 ? "0 12px" : windowWidth < 768 ? "0 15px" : "0 20px",
      background:
        status === "Available"
          ? "#C5FAC9"
          : status === "Rented"
            ? "#C5D6FA"
            : "#FFBBBB",
      fontWeight: 500,
      fontSize:
        windowWidth < 640 ? "12px" : windowWidth < 768 ? "13px" : "14px",
      whiteSpace: "nowrap",
      fontFamily: "Montserrat",
    }),
    inquiryStatusButton: (status) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: windowWidth < 640 ? "85px" : windowWidth < 768 ? "95px" : "105px",
      height: windowWidth < 640 ? "35px" : windowWidth < 768 ? "40px" : "43px",
      borderRadius: "6px",
      padding:
        windowWidth < 640 ? "6px 8px" : windowWidth < 768 ? "8px 10px" : "10px",
      fontWeight: 500,
      fontSize:
        windowWidth < 640 ? "12px" : windowWidth < 768 ? "13px" : "14px",
      background:
        status === "Contacted"
          ? "#D4FFD4"
          : status === "New"
            ? "#E0ECFF"
            : status === "Converted"
              ? "#D4EDDA"
              : "#E5E5E5",
      whiteSpace: "nowrap",
      fontFamily: "Montserrat",
    }),

    emptyState: {
      textAlign: "center",
      padding: windowWidth < 640 ? "30px 20px" : "40px 20px",
      color: "#9CA3AF",
      fontSize: windowWidth < 640 ? "13px" : "14px",
      fontFamily: "Montserrat",
    },
  };

  return (
    <div style={styles.container}>
      {/* Welcome */}
      <div style={styles.welcomeTitle}>Welcome Admin</div>
      <div style={styles.welcomeSubtitle}>
        Here's a snapshot of your property management dashboard today.
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.id} style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={styles.statTitle}>{s.title}</div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statChange}>{s.change}</div>
            </div>
            <div
              style={{
                ...styles.statIconBox,
                background: s.bgColor,
              }}
            >
              <img
                src={s.icon}
                alt=""
                width={windowWidth < 640 ? 20 : 24}
                height={windowWidth < 640 ? 20 : 24}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div style={styles.tableCard}>
        <div style={styles.tableTitle}>Recent Inquiries</div>
        {recentInquiries.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, borderRadius: "10px 0 0 10px" }}>
                  Name
                </th>
                <th style={styles.th}>Properties</th>
                <th style={{ ...styles.th, borderRadius: "0 10px 10px 0" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((row, index) => (
                <tr key={row.id}>
                  <td
                    style={{
                      ...styles.td,
                      borderTopLeftRadius: index === 0 ? "10px" : "0",
                      borderBottomLeftRadius:
                        index === recentInquiries.length - 1 ? "10px" : "0",
                    }}
                  >
                    {row.name}
                  </td>
                  <td style={styles.td}>{row.property}</td>
                  <td
                    style={{
                      ...styles.td,
                      borderTopRightRadius: index === 0 ? "10px" : "0",
                      borderBottomRightRadius:
                        index === recentInquiries.length - 1 ? "10px" : "0",
                    }}
                  >
                    <span style={styles.inquiryStatusButton(row.status)}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.emptyState}>No inquiries yet</div>
        )}
      </div>

      {/* Recently Added Properties */}
      <div style={styles.tableCard}>
        <div style={styles.tableTitle}>Recently Added Properties</div>
        {recentProperties.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {recentProperties.map((row) => (
              <div key={row.id} style={styles.propertyCard}>
                <div style={styles.propertyInfo}>
                  <div style={styles.propertyName}>{row.name}</div>
                  <div style={styles.propertyLocation}>{row.location}</div>
                  <div style={styles.propertyDetails}>{row.details}</div>
                </div>
                <div style={styles.propertyPriceStatus}>
                  <div style={styles.propertyPrice}>{row.price}</div>
                  <span style={styles.statusButton(row.status)}>
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>No properties yet</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
