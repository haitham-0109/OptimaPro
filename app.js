/**
 * OptimaPro - Industry Production & Inventory Management System
 * Core State Engine, Routing, Calculations, Modals & Render Controller
 */

// Global Application State Object
let AppState = {
    settings: {
        companyName: "Industrial Solutions Ltd.",
        companyEmail: "operations@industrialsolutions.com",
        companyPhone: "+1 (555) 019-2834",
        companyAddress: "4820 Innovation Blvd, Suite 100",
        currency: "$",
        taxRate: 8.0,
        electricityRate: 0.15,
        weightUnit: "kg"
    },
    userRole: "Manager", // Options: Admin, Manager, Operator
    rawMaterials: [],
    workingMaterials: [],
    productionBatches: [],
    machines: [],
    electricityLogs: [],
    sales: [],
    expenses: [],
    suppliers: [],
    customers: [],
    auditLogs: []
};

// Seed Data Configuration
const SeedData = {
    rawMaterials: [
        { name: "Pure Copper Ore", supplier: "Apex Mining Corp", qty: 15200, cost: 2.20, date: "2026-06-15", invoice: "INV-8910", status: "In Stock" },
        { name: "Raw Steel Ingots", supplier: "Vanguard Foundry Ltd", qty: 12400, cost: 1.10, date: "2026-06-20", invoice: "INV-9281", status: "In Stock" },
        { name: "Aluminium Billets", supplier: "AluMax Industries", qty: 450, cost: 3.10, date: "2026-06-24", invoice: "INV-7362", status: "Low Stock" },
        { name: "Polyethylene Resin", supplier: "ChemLabs Co.", qty: 0, cost: 0.85, date: "2026-06-01", invoice: "INV-6251", status: "Out of Stock" }
    ],
    workingMaterials: [
        { name: "Copper Wire Coils 10mm", qty: 4200, cost: 3.10, price: 6.80, status: "In Stock" },
        { name: "H-Beam Structural Steel", qty: 2800, cost: 1.80, price: 3.40, status: "In Stock" },
        { name: "Extruded Aluminium Profiles", qty: 150, cost: 4.20, price: 8.50, status: "Low Stock" },
        { name: "Molded Plastic Casings", qty: 0, cost: 1.30, price: 2.80, status: "Out of Stock" }
    ],
    machines: [
        { name: "Hydraulic Extruder A", power: 45.0, status: "Running", hoursToday: 6.5, hoursTotal: 1240 },
        { name: "Rotary Ingot Kiln B", power: 110.0, status: "Idle", hoursToday: 0.0, hoursTotal: 3820 },
        { name: "Aluminium Press C", power: 35.0, status: "Maintenance", hoursToday: 0.0, hoursTotal: 850 },
        { name: "Injection Molder D", power: 22.0, status: "Idle", hoursToday: 4.2, hoursTotal: 560 }
    ],
    suppliers: [
        { name: "Apex Mining Corp", rep: "John Sterling", phone: "+1 (555) 304-9281", email: "sterling@apexmining.com", pending: 12500 },
        { name: "Vanguard Foundry Ltd", rep: "Elena Rostova", phone: "+1 (555) 891-2731", email: "contact@vanguardfoundry.com", pending: 8000 },
        { name: "AluMax Industries", rep: "David Vance", phone: "+1 (555) 438-1928", email: "vance@alumax.com", pending: 0 },
        { name: "ChemLabs Co.", rep: "Dr. Linda Choi", phone: "+1 (555) 902-8172", email: "lchoi@chemlabs.com", pending: 3200 }
    ],
    customers: [
        { name: "Apex Electrical Supply", rep: "Mark Robinson", phone: "+1 (555) 987-6543", email: "procurement@apexsupply.com", orders: 14, status: "Paid" },
        { name: "Steelworks Construction", rep: "Robert T.", phone: "+1 (555) 483-2938", email: "robert@steelworks.com", orders: 22, status: "Paid" },
        { name: "GridTech Power Systems", rep: "Elena Croft", phone: "+1 (555) 829-1029", email: "croft@gridtech.com", orders: 8, status: "Pending" }
    ],
    productionBatches: [
        { batch: "BATCH-089", materialUsed: "Pure Copper Ore", qtyUsed: 1200, wmProduced: "Copper Wire Coils 10mm", qtyOutput: 1120, waste: 80, cost: 3200.00, efficiency: 93.3, date: "2026-06-25", machine: "Hydraulic Extruder A" },
        { batch: "BATCH-090", materialUsed: "Raw Steel Ingots", qtyUsed: 3000, wmProduced: "H-Beam Structural Steel", qtyOutput: 2850, waste: 150, cost: 4100.50, efficiency: 95.0, date: "2026-06-28", machine: "Rotary Ingot Kiln B" },
        { batch: "BATCH-091", materialUsed: "Aluminium Billets", qtyUsed: 500, wmProduced: "Extruded Aluminium Profiles", qtyOutput: 470, waste: 30, cost: 2150.00, efficiency: 94.0, date: "2026-07-01", machine: "Aluminium Press C" }
    ],
    electricityLogs: [
        { date: "2026-07-01", machine: "Hydraulic Extruder A", hours: 8.0, consumption: 360, rate: 0.15, cost: 54.00 },
        { date: "2026-07-02", machine: "Rotary Ingot Kiln B", hours: 6.0, consumption: 660, rate: 0.15, cost: 99.00 },
        { date: "2026-07-03", machine: "Injection Molder D", hours: 10.0, consumption: 220, rate: 0.15, cost: 33.00 },
        { date: "2026-07-04", machine: "Hydraulic Extruder A", hours: 6.5, consumption: 292.5, rate: 0.15, cost: 43.88 }
    ],
    sales: [
        { invoice: "INV-2026-001", customer: "Apex Electrical Supply", product: "Copper Wire Coils 10mm", qty: 1500, price: 6.80, total: 10200.00, date: "2026-06-28", paymentStatus: "Paid" },
        { invoice: "INV-2026-002", customer: "Steelworks Construction", product: "H-Beam Structural Steel", qty: 2000, price: 3.40, total: 6800.00, date: "2026-07-02", paymentStatus: "Paid" },
        { invoice: "INV-2026-003", customer: "GridTech Power Systems", product: "Copper Wire Coils 10mm", qty: 500, price: 6.80, total: 3400.00, date: "2026-07-03", paymentStatus: "Pending" }
    ],
    expenses: [
        { date: "2026-06-05", category: "Salaries", amount: 48000.00, notes: "Monthly employee salaries payout" },
        { date: "2026-06-10", category: "Transport", amount: 8500.00, notes: "Logistics fuel & delivery fleets transport" },
        { date: "2026-06-15", category: "Maintenance", amount: 4200.00, notes: "Kiln thermal sensor parts replacements" },
        { date: "2026-07-01", category: "Electricity", amount: 1250.00, notes: "Grid utility invoice June billing cycle" }
    ],
    auditLogs: [
        { type: "info", desc: "System initialized with base parameters.", time: "2026-07-04 08:00:00" },
        { type: "success", desc: "Successfully sync with local cloud workspace database.", time: "2026-07-04 08:00:05" },
        { type: "warning", desc: "Polyethylene Resin stock level is Empty.", time: "2026-07-04 08:15:30" }
    ]
};

// Main Active Chart references (to allow destroying and re-initializing)
let performanceChartRef = null;
let costsChartRef = null;
let marginChartRef = null;

/**
 * INIT APP
 */
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    registerEventListeners();
    applyRolePermissions();
    switchTab("dashboard");
    showSystemNotifications();
});

/**
 * STATE MANAGEMENT FUNCTIONS
 */
function loadState() {
    const saved = localStorage.getItem("optimapro_state");
    if (saved) {
        try {
            AppState = JSON.parse(saved);
        } catch (e) {
            console.error("Failed parsing localStorage state. Re-seeding database.", e);
            seedDatabase();
        }
    } else {
        seedDatabase();
    }
}

function saveState() {
    localStorage.setItem("optimapro_state", JSON.stringify(AppState));
    refreshUIComponents();
}

function seedDatabase() {
    AppState.rawMaterials = [...SeedData.rawMaterials];
    AppState.workingMaterials = [...SeedData.workingMaterials];
    AppState.machines = [...SeedData.machines];
    AppState.suppliers = [...SeedData.suppliers];
    AppState.customers = [...SeedData.customers];
    AppState.productionBatches = [...SeedData.productionBatches];
    AppState.electricityLogs = [...SeedData.electricityLogs];
    AppState.sales = [...SeedData.sales];
    AppState.expenses = [...SeedData.expenses];
    AppState.auditLogs = [...SeedData.auditLogs];
    saveState();
}

function logAudit(type, desc) {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    AppState.auditLogs.unshift({ type, desc, time: dateStr });
    // Cap logs at 50 for performance
    if (AppState.auditLogs.length > 50) {
        AppState.auditLogs.pop();
    }
    saveState();
}

/**
 * ROUTING / TABS CONTROLLERS
 */
function registerEventListeners() {
    // Sidebar items
    document.querySelectorAll(".sidebar-menu .menu-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const target = item.getAttribute("data-target");
            switchTab(target);
            document.getElementById("app-layout").classList.remove("sidebar-mobile-active");
        });
    });

    // Settings Navigation Pane toggler
    document.querySelectorAll(".settings-nav-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".settings-nav-item").forEach(i => i.classList.remove("active"));
            document.querySelectorAll(".settings-pane").forEach(p => p.classList.remove("active"));
            item.classList.add("active");
            const targetPane = item.getAttribute("data-pane");
            document.getElementById(targetPane).classList.add("active");
        });
    });

    // Sidebar toggle collapse
    document.getElementById("sidebar-toggle").addEventListener("click", () => {
        const layout = document.getElementById("app-layout");
        const toggleIcon = document.getElementById("toggle-icon");
        
        // If on mobile viewport, sidebar toggle acts as close button for overlay
        if (window.innerWidth <= 768) {
            layout.classList.remove("sidebar-mobile-active");
            return;
        }
        
        layout.classList.toggle("sidebar-collapsed");
        if (layout.classList.contains("sidebar-collapsed")) {
            toggleIcon.className = "fa-solid fa-chevron-right";
        } else {
            toggleIcon.className = "fa-solid fa-chevron-left";
        }
    });

    // Mobile Hamburger Toggle
    document.getElementById("mobile-menu-btn").addEventListener("click", () => {
        document.getElementById("app-layout").classList.add("sidebar-mobile-active");
    });

    // Mobile Backdrop Click-to-close
    document.getElementById("sidebar-backdrop").addEventListener("click", () => {
        document.getElementById("app-layout").classList.remove("sidebar-mobile-active");
    });

    // User role switcher
    document.getElementById("role-switcher").addEventListener("change", (e) => {
        AppState.userRole = e.target.value;
        logAudit("info", `User switched role profile to: ${AppState.userRole}`);
        applyRolePermissions();
    });

    // Login submit
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const screen = document.getElementById("login-screen");
        screen.classList.add("hidden");
        showToast("Access Granted", `Logged in as Shift ${AppState.userRole}`, "success");
        logAudit("success", `Secure Login successful under role profiles: ${AppState.userRole}`);
    });

    // Forms triggers
    document.getElementById("raw-material-form").addEventListener("submit", saveRawMaterial);
    document.getElementById("machine-form").addEventListener("submit", saveMachine);
    document.getElementById("working-material-form-inner").addEventListener("submit", saveWorkingMaterial);
    document.getElementById("supplier-form").addEventListener("submit", saveSupplier);
    document.getElementById("customer-form-inner").addEventListener("submit", saveCustomer);
    document.getElementById("production-log-form").addEventListener("submit", saveProductionBatchForm);
    document.getElementById("modal-production-form").addEventListener("submit", saveModalProductionBatchForm);
    document.getElementById("electricity-calc-form").addEventListener("submit", saveElectricityLog);
    document.getElementById("expense-log-form").addEventListener("submit", saveExpense);
    document.getElementById("sale-form").addEventListener("submit", saveSaleInvoice);

    // Auto calculations binding for Production Logging Form
    document.getElementById("prod-qty-used").addEventListener("input", runProductionCalculators);
    document.getElementById("prod-qty-output").addEventListener("input", runProductionCalculators);
    document.getElementById("prod-qty-waste").addEventListener("input", runProductionCalculators);
    document.getElementById("prod-raw-used").addEventListener("change", runProductionCalculators);
    document.getElementById("prod-machine").addEventListener("change", runProductionCalculators);

    // Quick Action Quick Modal Production binds
    document.getElementById("modal-prod-qty-used").addEventListener("input", runModalProductionCalculators);
    document.getElementById("modal-prod-qty-output").addEventListener("input", runModalProductionCalculators);
    document.getElementById("modal-prod-qty-waste").addEventListener("input", runModalProductionCalculators);
    document.getElementById("modal-prod-raw-used").addEventListener("change", runModalProductionCalculators);
    document.getElementById("modal-prod-machine").addEventListener("change", runModalProductionCalculators);

    // Binds for Sales Modal calculations
    document.getElementById("sale-qty").addEventListener("input", runSalesCalculators);
    document.getElementById("sale-price").addEventListener("input", runSalesCalculators);
    document.getElementById("sale-product").addEventListener("change", runSalesCalculators);

    // Electricity Real-Time calculations
    document.getElementById("elec-hours").addEventListener("input", runElectricityCalculatorFields);
    document.getElementById("elec-machine").addEventListener("change", runElectricityCalculatorFields);
    document.getElementById("elec-rate").addEventListener("input", runElectricityCalculatorFields);

    // Search and Filter controls Binds
    document.getElementById("raw-search").addEventListener("input", renderRawMaterialsTable);
    document.getElementById("raw-filter-status").addEventListener("change", renderRawMaterialsTable);
    document.getElementById("wm-search").addEventListener("input", renderWorkingMaterialsTable);
    document.getElementById("wm-filter-status").addEventListener("change", renderWorkingMaterialsTable);
    document.getElementById("sales-search").addEventListener("input", renderSalesTable);
    document.getElementById("sales-filter-payment").addEventListener("change", renderSalesTable);
    document.getElementById("supplier-search").addEventListener("input", renderSuppliersTable);
    document.getElementById("customer-search").addEventListener("input", renderCustomersTable);

    // Global dashboard search
    document.getElementById("global-search").addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        if (query) {
            // Find active tab and apply lookup query to its search bar
            const activeView = document.querySelector(".view-section.active");
            if (activeView.id === "dashboard-view") {
                // If on dashboard, toggle tab to Raw Materials and execute query search
                switchTab("raw-materials");
                document.getElementById("raw-search").value = query;
                renderRawMaterialsTable();
            } else {
                const innerSearch = activeView.querySelector(".glass-input");
                if (innerSearch) {
                    innerSearch.value = query;
                    // Trigger input event manually
                    innerSearch.dispatchEvent(new Event('input'));
                }
            }
        }
    });

    // Backup & reset actions
    document.getElementById("btn-backup-db").addEventListener("click", backupDatabase);
    document.getElementById("btn-reset-db").addEventListener("click", () => {
        if (confirm("Are you sure you want to reset the database? All custom inputs will be lost!")) {
            seedDatabase();
            showToast("Database Reset", "System returned to initial workspace profiles", "warning");
        }
    });

    // Save company info settings
    document.getElementById("settings-company-form").addEventListener("submit", (e) => {
        e.preventDefault();
        AppState.settings.companyName = document.getElementById("set-company-name").value;
        AppState.settings.companyEmail = document.getElementById("set-company-email").value;
        AppState.settings.companyPhone = document.getElementById("set-company-phone").value;
        AppState.settings.companyAddress = document.getElementById("set-company-address").value;
        saveState();
        showToast("Settings Updated", "Corporate profiles details saved", "success");
        logAudit("success", "Saved updated company details configurations");
    });

    // Save financials info settings
    document.getElementById("settings-financials-form").addEventListener("submit", (e) => {
        e.preventDefault();
        AppState.settings.currency = document.getElementById("set-currency").value;
        AppState.settings.taxRate = parseFloat(document.getElementById("set-tax-rate").value);
        AppState.settings.electricityRate = parseFloat(document.getElementById("set-elec-rate").value);
        AppState.settings.weightUnit = document.getElementById("set-weight-unit").value;
        saveState();
        showToast("Settings Updated", "Financial parameters applied successfully", "success");
        logAudit("success", "Applied system weights, default currency symbols, and utility rate configurations");
    });

    // Dashboard dynamic charts toggle buttons
    document.getElementById("chart-btn-prod").addEventListener("click", (e) => {
        toggleDashboardChartButton(e.target);
        renderDashboardPerformanceChart("production");
    });
    document.getElementById("chart-btn-sales").addEventListener("click", (e) => {
        toggleDashboardChartButton(e.target);
        renderDashboardPerformanceChart("sales");
    });
    document.getElementById("chart-btn-elec").addEventListener("click", (e) => {
        toggleDashboardChartButton(e.target);
        renderDashboardPerformanceChart("electricity");
    });

    // Electricity reports toggle buttons
    document.getElementById("elec-report-daily").addEventListener("click", (e) => {
        toggleElecReportButton(e.target);
        renderElectricityLogs("daily");
    });
    document.getElementById("elec-report-weekly").addEventListener("click", (e) => {
        toggleElecReportButton(e.target);
        renderElectricityLogs("weekly");
    });
    document.getElementById("elec-report-monthly").addEventListener("click", (e) => {
        toggleElecReportButton(e.target);
        renderElectricityLogs("monthly");
    });

    // Reports generator controls
    document.querySelectorAll(".report-type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".report-type-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            updateReportPreview();
        });
    });
    document.getElementById("report-timeframe").addEventListener("change", updateReportPreview);
    document.getElementById("export-excel-btn").addEventListener("click", exportReportExcel);
    document.getElementById("export-pdf-btn").addEventListener("click", exportReportPDF);

    // Scan simulator actions
    document.getElementById("btn-simulate-scan").addEventListener("click", executeBarcodeScanSimulation);
}

function switchTab(targetId) {
    // UI section visibility toggler
    document.querySelectorAll(".view-section").forEach(sec => {
        sec.classList.remove("active");
    });
    const activeSec = document.getElementById(`${targetId}-view`);
    if (activeSec) {
        activeSec.classList.add("active");
    }

    // Sidebar active item styling
    document.querySelectorAll(".sidebar-menu .menu-item").forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-target") === targetId) {
            item.classList.add("active");
        }
    });

    // Update Header active text
    const cleanTitles = {
        "dashboard": "Dashboard Overview",
        "raw-materials": "Raw Material Management",
        "production": "Production & Batches Registry",
        "machines": "Machinery Asset Tracking",
        "electricity": "Electricity Cost & Utilities Audit",
        "working-materials": "Working Material Inventory",
        "sales": "Sales Orders & Billings Desk",
        "expenses": "Operational Expenses Tracker",
        "profit-analysis": "Financial Profit & Margins Analysis",
        "reports": "Analytical Reports Architect",
        "suppliers": "Suppliers Index & Purchase History",
        "customers": "Customers Directory",
        "settings": "System & Financial Parameters Configuration"
    };
    
    document.getElementById("active-tab-title").innerText = cleanTitles[targetId] || "OptimaPro Hub";
    
    // Auto-scrolling up on tab switches
    document.querySelector(".main-content").scrollTop = 0;

    // Refresh UI components for the specific view
    refreshUIComponents();
}

function toggleDashboardChartButton(activeBtn) {
    document.querySelectorAll(".chart-panel-container .action-buttons-group .glass-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    activeBtn.classList.add("active");
}

function toggleElecReportButton(activeBtn) {
    document.querySelectorAll("#electricity-view .action-buttons-group .glass-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    activeBtn.classList.add("active");
}

/**
 * USER ACCESS & ROLE CONTROL LAWS
 */
function applyRolePermissions() {
    const role = AppState.userRole;
    
    // Header updates
    document.getElementById("header-avatar-letter").innerText = role.substring(0,1);
    document.getElementById("avatar-letter").innerText = role.substring(0,1);
    document.getElementById("sidebar-user-name").innerText = role === "Admin" ? "Administrator" : (role === "Manager" ? "Factory Manager" : "Shift Operator");
    document.getElementById("header-user-name").innerText = role === "Admin" ? "Sys Admin" : (role === "Manager" ? "F. Manager" : "S. Operator");
    document.getElementById("sidebar-role-badge").innerText = role;
    document.getElementById("header-role-title").innerText = role === "Admin" ? "System Control Owner" : (role === "Manager" ? "Production Manager" : "Line Operator");

    // Menu settings block
    const settingsItem = document.querySelector(".sidebar-menu .menu-item[data-target='settings']");
    if (role === "Operator") {
        settingsItem.style.display = "none";
        // If current active tab is settings, auto route operator away to dashboard
        const activeSection = document.querySelector(".view-section.active");
        if (activeSection && activeSection.id === "settings-view") {
            switchTab("dashboard");
        }
    } else {
        settingsItem.style.display = "block";
    }

    // Toggle button inputs disabling
    document.querySelectorAll(".glass-btn-danger, .delete-btn").forEach(btn => {
        if (role === "Operator") {
            btn.style.opacity = "0.4";
            btn.title = "Operators cannot perform deletion overrides";
            btn.setAttribute("disabled", "true");
        } else {
            btn.style.opacity = "1";
            btn.title = "";
            btn.removeAttribute("disabled");
        }
    });

    // Populate roles list configuration elements if settings view is open
    const settingsRolePane = document.getElementById("user-roles-settings");
    if (settingsRolePane) {
        // Toggle view blocks
    }
}

/**
 * MODAL COMPONENT WINDOW HANDLERS
 */
window.openModal = function(modalId, editIndex = null) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("active");
        
        // Populate option lists for selector nodes inside the opening modal
        if (modalId === "raw-material-modal") {
            populateSupplierDropdown("raw-supplier");
            if (editIndex !== null) {
                // Setup edit mode parameters
                document.getElementById("raw-modal-title").innerText = "Edit Raw Material";
                const mat = AppState.rawMaterials[editIndex];
                document.getElementById("raw-material-index").value = editIndex;
                document.getElementById("raw-name").value = mat.name;
                document.getElementById("raw-supplier").value = mat.supplier;
                document.getElementById("raw-qty").value = mat.qty;
                document.getElementById("raw-cost").value = mat.cost;
                document.getElementById("raw-date").value = mat.date;
                document.getElementById("raw-invoice").value = mat.invoice;
            } else {
                document.getElementById("raw-modal-title").innerText = "Add Raw Material";
                document.getElementById("raw-material-form").reset();
                document.getElementById("raw-material-index").value = "";
                document.getElementById("raw-date").value = new Date().toISOString().substring(0, 10);
            }
        }
        
        if (modalId === "production-modal") {
            populateRawDropdown("modal-prod-raw-used");
            populateWorkingDropdown("modal-prod-wm-produced");
            populateMachineDropdown("modal-prod-machine");
            document.getElementById("modal-production-form").reset();
            document.getElementById("modal-prod-date").value = new Date().toISOString().substring(0, 10);
            runModalProductionCalculators();
        }

        if (modalId === "machine-modal") {
            if (editIndex !== null) {
                document.getElementById("machine-modal-title").innerText = "Edit Machine Asset";
                const mach = AppState.machines[editIndex];
                document.getElementById("machine-index").value = editIndex;
                document.getElementById("mach-name").value = mach.name;
                document.getElementById("mach-power").value = mach.power;
                document.getElementById("mach-status").value = mach.status;
                document.getElementById("mach-hours-today").value = mach.hoursToday;
                document.getElementById("mach-hours-total").value = mach.hoursTotal;
            } else {
                document.getElementById("machine-modal-title").innerText = "Register Machinery";
                document.getElementById("machine-form").reset();
                document.getElementById("machine-index").value = "";
            }
        }

        if (modalId === "working-material-modal") {
            if (editIndex !== null) {
                document.getElementById("wm-modal-title").innerText = "Edit Inventory Product";
                const wm = AppState.workingMaterials[editIndex];
                document.getElementById("wm-index").value = editIndex;
                document.getElementById("wm-name").value = wm.name;
                document.getElementById("wm-qty").value = wm.qty;
                document.getElementById("wm-cost").value = wm.cost;
                document.getElementById("wm-price").value = wm.price;
            } else {
                document.getElementById("wm-modal-title").innerText = "Add Inventory Product Item";
                document.getElementById("working-material-form-inner").reset();
                document.getElementById("wm-index").value = "";
            }
        }

        if (modalId === "sale-modal") {
            populateCustomerDropdown("sale-customer");
            populateWorkingDropdown("sale-product");
            document.getElementById("sale-form").reset();
            document.getElementById("sale-date").value = new Date().toISOString().substring(0, 10);
            runSalesCalculators();
        }

        if (modalId === "supplier-modal") {
            if (editIndex !== null) {
                document.getElementById("supplier-modal-title").innerText = "Edit Supplier Profile";
                const sup = AppState.suppliers[editIndex];
                document.getElementById("supplier-index").value = editIndex;
                document.getElementById("sup-name").value = sup.name;
                document.getElementById("sup-rep").value = sup.rep;
                document.getElementById("sup-phone").value = sup.phone;
                document.getElementById("sup-email").value = sup.email;
                document.getElementById("sup-pending").value = sup.pending;
            } else {
                document.getElementById("supplier-modal-title").innerText = "Register Supplier";
                document.getElementById("supplier-form").reset();
                document.getElementById("supplier-index").value = "";
            }
        }

        if (modalId === "customer-modal") {
            if (editIndex !== null) {
                document.getElementById("customer-modal-title").innerText = "Edit Customer Profile";
                const cust = AppState.customers[editIndex];
                document.getElementById("customer-index").value = editIndex;
                document.getElementById("cust-name").value = cust.name;
                document.getElementById("cust-rep").value = cust.rep;
                document.getElementById("cust-phone").value = cust.phone;
                document.getElementById("cust-email").value = cust.email;
            } else {
                document.getElementById("customer-modal-title").innerText = "Register Customer";
                document.getElementById("customer-form-inner").reset();
                document.getElementById("customer-index").value = "";
            }
        }
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
};

/**
 * DROPDOWNS POPULATION CORE
 */
function populateSupplierDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = AppState.suppliers.map(sup => `<option value="${sup.name}">${sup.name}</option>`).join("");
    }
}

function populateCustomerDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = AppState.customers.map(cust => `<option value="${cust.name}">${cust.name}</option>`).join("");
    }
}

function populateRawDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = AppState.rawMaterials
            .filter(r => r.qty > 0)
            .map(r => `<option value="${r.name}">${r.name} (${r.qty} ${AppState.settings.weightUnit} avail)</option>`).join("");
        
        if (select.innerHTML === "") {
            select.innerHTML = "<option value=''>No Raw Material in stock!</option>";
        }
    }
}

function populateWorkingDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = AppState.workingMaterials.map(wm => `<option value="${wm.name}">${wm.name}</option>`).join("");
    }
}

function populateMachineDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = AppState.machines
            .filter(m => m.status !== "Maintenance")
            .map(m => `<option value="${m.name}">${m.name} (${m.status})</option>`).join("");
    }
}

/**
 * RE-RENDER AND UI COMPONENTS UPDATES DISPATCHER
 */
function refreshUIComponents() {
    const activeSection = document.querySelector(".view-section.active");
    if (!activeSection) return;

    // View-specific bindings updates
    if (activeSection.id === "dashboard-view") {
        renderDashboardKPIs();
        renderDashboardPerformanceChart();
        renderDashboardRecentActivities();
    } else if (activeSection.id === "raw-materials-view") {
        renderRawMaterialsTable();
    } else if (activeSection.id === "production-view") {
        populateRawDropdown("prod-raw-used");
        populateWorkingDropdown("prod-wm-produced");
        populateMachineDropdown("prod-machine");
        document.getElementById("prod-date").value = new Date().toISOString().substring(0, 10);
        renderProductionBatchesTable();
        runProductionCalculators();
    } else if (activeSection.id === "machines-view") {
        renderMachinesGrid();
    } else if (activeSection.id === "electricity-view") {
        populateMachineDropdown("elec-machine");
        document.getElementById("elec-rate").value = AppState.settings.electricityRate;
        renderElectricityLogs();
        runElectricityCalculatorFields();
    } else if (activeSection.id === "working-materials-view") {
        renderWorkingMaterialsTable();
    } else if (activeSection.id === "sales-view") {
        renderSalesTable();
    } else if (activeSection.id === "expenses-view") {
        document.getElementById("exp-date").value = new Date().toISOString().substring(0, 10);
        renderExpensesUI();
    } else if (activeSection.id === "profit-analysis-view") {
        renderProfitSummaryKPIs();
        renderProfitCharts();
    } else if (activeSection.id === "reports-view") {
        updateReportPreview();
    } else if (activeSection.id === "suppliers-view") {
        renderSuppliersTable();
    } else if (activeSection.id === "customers-view") {
        renderCustomersTable();
    }
    
    // Run stock warning check checks automatically
    checkLowStocksAlerts();
}

/**
 * SCREEN 2: DASHBOARD RENDERING & CHARTS
 */
function renderDashboardKPIs() {
    const totalRaw = AppState.rawMaterials.reduce((acc, curr) => acc + curr.qty, 0);
    const totalWM = AppState.workingMaterials.reduce((acc, curr) => acc + curr.qty, 0);
    
    const today = new Date().toISOString().substring(0,10);
    const todayProd = AppState.productionBatches
        .filter(b => b.date === today)
        .reduce((acc, curr) => acc + curr.qtyOutput, 0);
    
    const todaySales = AppState.sales
        .filter(s => s.date === today)
        .reduce((acc, curr) => acc + curr.total, 0);
        
    const todayElec = AppState.electricityLogs
        .filter(l => l.date === today)
        .reduce((acc, curr) => acc + curr.cost, 0);

    // Financial sums for June/July (This month calculation)
    const currentMonth = new Date().getMonth(); // 0-11
    const monthlyRevenue = AppState.sales
        .filter(s => new Date(s.date).getMonth() === currentMonth)
        .reduce((acc, curr) => acc + curr.total, 0);

    const monthlyExpenses = AppState.expenses
        .filter(e => new Date(e.date).getMonth() === currentMonth)
        .reduce((acc, curr) => acc + curr.amount, 0);
        
    const monthlyRawCost = AppState.productionBatches
        .filter(b => new Date(b.date).getMonth() === currentMonth)
        .reduce((acc, curr) => acc + curr.cost, 0);
        
    const monthlyUtilityCost = AppState.electricityLogs
        .filter(l => new Date(l.date).getMonth() === currentMonth)
        .reduce((acc, curr) => acc + curr.cost, 0);

    const netProfit = monthlyRevenue - (monthlyExpenses + monthlyRawCost + monthlyUtilityCost);

    // Apply values to HTML indicators
    const u = AppState.settings.weightUnit;
    const c = AppState.settings.currency;
    
    document.getElementById("kpi-raw-stock").innerText = `${totalRaw.toLocaleString()} ${u}`;
    document.getElementById("kpi-working-stock").innerText = `${totalWM.toLocaleString()} ${u}`;
    document.getElementById("kpi-today-production").innerText = `${todayProd.toLocaleString()} ${u}`;
    document.getElementById("kpi-today-sales").innerText = `${c}${todaySales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById("kpi-electricity-cost").innerText = `${c}${todayElec.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById("kpi-total-revenue").innerText = `${c}${monthlyRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    document.getElementById("kpi-total-expenses").innerText = `${c}${(monthlyExpenses + monthlyRawCost + monthlyUtilityCost).toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    
    const profitEl = document.getElementById("kpi-net-profit");
    profitEl.innerText = `${c}${netProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    if (netProfit < 0) {
        profitEl.style.color = "var(--status-danger)";
    } else {
        profitEl.style.color = "var(--accent-green)";
    }
}

function renderDashboardRecentActivities() {
    const list = document.getElementById("recent-activities-list");
    if (!list) return;
    
    list.innerHTML = AppState.auditLogs.map(log => {
        let icon = "fa-info";
        let bgClass = "bg-primary";
        if (log.type === "success") { icon = "fa-check"; bgClass = "glass-btn-success"; }
        else if (log.type === "warning") { icon = "fa-triangle-exclamation"; bgClass = "glass-btn-danger"; }
        
        return `
            <div class="activity-item">
                <div class="activity-icon-bullet ${bgClass}">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <div class="activity-info">
                    <div class="activity-desc">${log.desc}</div>
                    <div class="activity-time">${log.time}</div>
                </div>
            </div>
        `;
    }).join("");
}

function renderDashboardPerformanceChart(chartType = "production") {
    const canvas = document.getElementById("dashboardPerformanceChart");
    if (!canvas) return;

    if (performanceChartRef) {
        performanceChartRef.destroy();
    }

    // Pull last 7 dates labels
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(d.toISOString().substring(5, 10)); // MM-DD
    }

    const currentYear = new Date().getFullYear();
    const formattedDates = labels.map(l => `${currentYear}-${l}`);

    let dataSet = [];
    let labelTitle = "";
    let borderCol = "hsl(210, 100%, 55%)";
    let bgCol = "hsla(210, 100%, 55%, 0.15)";

    if (chartType === "production") {
        labelTitle = "Raw Material Processing output (kg)";
        borderCol = "hsl(210, 100%, 55%)";
        bgCol = "hsla(210, 100%, 55%, 0.1)";
        dataSet = formattedDates.map(date => {
            return AppState.productionBatches
                .filter(b => b.date === date)
                .reduce((acc, curr) => acc + curr.qtyOutput, 0);
        });
    } else if (chartType === "sales") {
        labelTitle = "Order Invoice Revenues ($)";
        borderCol = "hsl(142, 70%, 45%)";
        bgCol = "hsla(142, 70%, 45%, 0.1)";
        dataSet = formattedDates.map(date => {
            return AppState.sales
                .filter(s => s.date === date)
                .reduce((acc, curr) => acc + curr.total, 0);
        });
    } else if (chartType === "electricity") {
        labelTitle = "Energy Utility Costs ($)";
        borderCol = "hsl(350, 80%, 55%)";
        bgCol = "rgba(255, 26, 64, 0.1)";
        dataSet = formattedDates.map(date => {
            return AppState.electricityLogs
                .filter(l => l.date === date)
                .reduce((acc, curr) => acc + curr.cost, 0);
        });
    }

    performanceChartRef = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: labelTitle,
                data: dataSet,
                borderColor: borderCol,
                backgroundColor: bgCol,
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: borderCol,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'hsl(220, 12%, 76%)', font: { family: 'Inter' } }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'hsl(220, 10%, 50%)', font: { family: 'Inter' } }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'hsl(220, 10%, 50%)', font: { family: 'Inter' } }
                }
            }
        }
    });
}

/**
 * SCREEN 3: RAW MATERIAL CRUD
 */
function renderRawMaterialsTable() {
    const tbody = document.getElementById("raw-materials-table-body");
    if (!tbody) return;

    const searchQuery = document.getElementById("raw-search").value.toLowerCase();
    const filterStatus = document.getElementById("raw-filter-status").value;

    const filtered = AppState.rawMaterials.filter(mat => {
        const matchesSearch = mat.name.toLowerCase().includes(searchQuery) || mat.supplier.toLowerCase().includes(searchQuery);
        const matchesStatus = filterStatus === "All" || mat.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const c = AppState.settings.currency;
    const u = AppState.settings.weightUnit;

    tbody.innerHTML = filtered.map((mat, index) => {
        let statusClass = "in-stock";
        if (mat.status === "Low Stock") statusClass = "low-stock";
        if (mat.status === "Out of Stock") statusClass = "out-of-stock";

        return `
            <tr>
                <td><strong>${mat.name}</strong></td>
                <td>${mat.supplier}</td>
                <td>${mat.qty.toLocaleString()} ${u}</td>
                <td>${c}${mat.cost.toFixed(2)}</td>
                <td>${c}${(mat.qty * mat.cost).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                <td>${mat.date}</td>
                <td><code style="color:var(--text-accent)">${mat.invoice}</code></td>
                <td><span class="status-badge ${statusClass}">${mat.status}</span></td>
                <td>
                    <div class="table-action-btns">
                        <button class="table-action-btn edit-btn" onclick="openModal('raw-material-modal', ${index})"><i class="fa-regular fa-edit"></i></button>
                        <button class="table-action-btn delete-btn" onclick="deleteRawMaterial(${index})"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
    applyRolePermissions();
}

function saveRawMaterial(e) {
    e.preventDefault();
    const indexVal = document.getElementById("raw-material-index").value;
    const name = document.getElementById("raw-name").value;
    const supplier = document.getElementById("raw-supplier").value;
    const qty = parseFloat(document.getElementById("raw-qty").value);
    const cost = parseFloat(document.getElementById("raw-cost").value);
    const date = document.getElementById("raw-date").value;
    const invoice = document.getElementById("raw-invoice").value;

    let status = "In Stock";
    if (qty === 0) status = "Out of Stock";
    else if (qty < 500) status = "Low Stock";

    const dataObj = { name, supplier, qty, cost, date, invoice, status };

    if (indexVal !== "") {
        AppState.rawMaterials[parseInt(indexVal)] = dataObj;
        logAudit("info", `Updated Raw Material registry profile: ${name}`);
        showToast("Material Saved", `Updated detail metrics for ${name}`, "success");
    } else {
        AppState.rawMaterials.push(dataObj);
        logAudit("success", `Registered new purchase batch for Raw Material: ${name}`);
        showToast("Material Registered", `Logged purchase invoice: ${invoice}`, "success");
    }

    closeModal("raw-material-modal");
    saveState();
}

window.deleteRawMaterial = function(index) {
    if (AppState.userRole === "Operator") return;
    const item = AppState.rawMaterials[index];
    if (confirm(`Are you sure you want to remove raw material registry record: ${item.name}?`)) {
        AppState.rawMaterials.splice(index, 1);
        logAudit("warning", `Deleted Raw Material inventory index card: ${item.name}`);
        showToast("Record Removed", `${item.name} registry deleted`, "warning");
        saveState();
    }
};

/**
 * SCREEN 4: PRODUCTION CALCULATORS & HISTORY LOGS
 */
function runProductionCalculators() {
    const rawName = document.getElementById("prod-raw-used").value;
    const qtyUsed = parseFloat(document.getElementById("prod-qty-used").value) || 0;
    const qtyOutput = parseFloat(document.getElementById("prod-qty-output").value) || 0;
    const qtyWaste = parseFloat(document.getElementById("prod-qty-waste").value) || 0;
    const machineName = document.getElementById("prod-machine").value;

    const raw = AppState.rawMaterials.find(r => r.name === rawName);
    const machine = AppState.machines.find(m => m.name === machineName);

    const c = AppState.settings.currency;

    let materialCost = 0;
    if (raw) {
        materialCost = qtyUsed * raw.cost;
    }
    document.getElementById("prod-calc-mat-cost").innerText = `${c}${materialCost.toFixed(2)}`;

    // Electricity consumption is estimated as: Machine power rating kW * 1.5 hr batch standard cycle * rate
    let electricityCost = 0;
    if (machine) {
        const consumptionKWh = machine.power * 1.5;
        electricityCost = consumptionKWh * AppState.settings.electricityRate;
    }
    document.getElementById("prod-calc-elec-cost").innerText = `${c}${electricityCost.toFixed(2)}`;

    let efficiency = 0;
    if (qtyUsed > 0) {
        efficiency = (qtyOutput / qtyUsed) * 100;
    }
    document.getElementById("prod-calc-efficiency").innerText = `${efficiency.toFixed(1)}%`;

    const totalEstimate = materialCost + electricityCost;
    document.getElementById("prod-calc-total").innerText = `${c}${totalEstimate.toFixed(2)}`;
}

function saveProductionBatchForm(e) {
    e.preventDefault();
    const batch = document.getElementById("prod-batch-name").value;
    const date = document.getElementById("prod-date").value;
    const rawName = document.getElementById("prod-raw-used").value;
    const qtyUsed = parseFloat(document.getElementById("prod-qty-used").value);
    const wmName = document.getElementById("prod-wm-produced").value;
    const qtyOutput = parseFloat(document.getElementById("prod-qty-output").value);
    const waste = parseFloat(document.getElementById("prod-qty-waste").value);
    const machineName = document.getElementById("prod-machine").value;

    executeBatchLogLogic(batch, date, rawName, qtyUsed, wmName, qtyOutput, waste, machineName);
    document.getElementById("production-log-form").reset();
    refreshUIComponents();
}

function runModalProductionCalculators() {
    const rawName = document.getElementById("modal-prod-raw-used").value;
    const qtyUsed = parseFloat(document.getElementById("modal-prod-qty-used").value) || 0;
    const qtyOutput = parseFloat(document.getElementById("modal-prod-qty-output").value) || 0;
    const machineName = document.getElementById("modal-prod-machine").value;

    const raw = AppState.rawMaterials.find(r => r.name === rawName);
    const machine = AppState.machines.find(m => m.name === machineName);

    // Estimates calculation
    let materialCost = raw ? (qtyUsed * raw.cost) : 0;
    let electricityCost = machine ? (machine.power * 1.5 * AppState.settings.electricityRate) : 0;
    let efficiency = qtyUsed > 0 ? ((qtyOutput / qtyUsed) * 100) : 0;

    // Display updates if relevant (simulated inside modals)
}

function saveModalProductionBatchForm(e) {
    e.preventDefault();
    const batch = document.getElementById("modal-prod-batch-name").value;
    const date = document.getElementById("modal-prod-date").value;
    const rawName = document.getElementById("modal-prod-raw-used").value;
    const qtyUsed = parseFloat(document.getElementById("modal-prod-qty-used").value);
    const wmName = document.getElementById("modal-prod-wm-produced").value;
    const qtyOutput = parseFloat(document.getElementById("modal-prod-qty-output").value);
    const waste = parseFloat(document.getElementById("modal-prod-qty-waste").value);
    const machineName = document.getElementById("modal-prod-machine").value;

    executeBatchLogLogic(batch, date, rawName, qtyUsed, wmName, qtyOutput, waste, machineName);
    closeModal("production-modal");
}

function executeBatchLogLogic(batch, date, rawName, qtyUsed, wmName, qtyOutput, waste, machineName) {
    const raw = AppState.rawMaterials.find(r => r.name === rawName);
    const wm = AppState.workingMaterials.find(w => w.name === wmName);
    const machine = AppState.machines.find(m => m.name === machineName);

    if (!raw || raw.qty < qtyUsed) {
        showToast("Error Logging Batch", `Insufficient stock of raw material: ${rawName}`, "error");
        return;
    }

    // Auto Calculations
    const materialCost = qtyUsed * raw.cost;
    const machinePowerHours = 1.5; // cycle hours estimate
    const electricityCost = machine ? (machine.power * machinePowerHours * AppState.settings.electricityRate) : 0;
    const totalCost = materialCost + electricityCost;
    const efficiency = parseFloat(((qtyOutput / qtyUsed) * 100).toFixed(1));

    // Update Stock inventories
    raw.qty -= qtyUsed;
    if (raw.qty === 0) raw.status = "Out of Stock";
    else if (raw.qty < 500) raw.status = "Low Stock";

    if (wm) {
        wm.qty += qtyOutput;
        if (wm.qty > 500) wm.status = "In Stock";
        else if (wm.qty > 0) wm.status = "Low Stock";
    }

    // Append to logs
    AppState.productionBatches.unshift({
        batch, materialUsed: rawName, qtyUsed, wmProduced: wmName, qtyOutput, waste, cost: totalCost, efficiency, date, machine: machineName
    });

    // Accumulate utility consumption on the machine and in utility logs
    if (machine) {
        machine.hoursToday = parseFloat((machine.hoursToday + machinePowerHours).toFixed(1));
        machine.hoursTotal = Math.round(machine.hoursTotal + machinePowerHours);
        
        AppState.electricityLogs.unshift({
            date: date,
            machine: machineName,
            hours: machinePowerHours,
            consumption: machine.power * machinePowerHours,
            rate: AppState.settings.electricityRate,
            cost: electricityCost
        });
    }

    logAudit("success", `Processed Production Batch ${batch}: Converted ${qtyUsed} kg ${rawName} to ${qtyOutput} kg ${wmName} using ${machineName}`);
    showToast("Batch Logged", `Batch ${batch} saved. Stocks modified`, "success");
    saveState();
}

function renderProductionBatchesTable() {
    const tbody = document.getElementById("production-batches-body");
    if (!tbody) return;

    const c = AppState.settings.currency;
    const u = AppState.settings.weightUnit;

    tbody.innerHTML = AppState.productionBatches.map(b => `
        <tr>
            <td><strong>${b.batch}</strong></td>
            <td>${b.qtyUsed.toLocaleString()} ${u} ${b.materialUsed}</td>
            <td><span style="color:var(--accent-green)">+${b.qtyOutput.toLocaleString()} ${u}</span> ${b.wmProduced}</td>
            <td>${b.waste} ${u}</td>
            <td>${c}${b.cost.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            <td><strong style="color:var(--accent-blue)">${b.efficiency}%</strong></td>
            <td>${b.date}</td>
        </tr>
    `).join("");
}

/**
 * SCREEN 5: MACHINE ASSETS
 */
function renderMachinesGrid() {
    const container = document.getElementById("machines-container");
    if (!container) return;

    container.innerHTML = AppState.machines.map((m, index) => {
        let statusBadgeClass = "idle";
        if (m.status === "Running") statusBadgeClass = "running";
        if (m.status === "Maintenance") statusBadgeClass = "maintenance";

        return `
            <div class="glass-panel machine-card">
                <div class="machine-card-header">
                    <div class="machine-name-group">
                        <h3>${m.name}</h3>
                        <span class="machine-rating">Rating: ${m.power} kW</span>
                    </div>
                    <span class="status-badge ${statusBadgeClass}">${m.status}</span>
                </div>
                
                <div class="machine-metrics">
                    <div class="metric-item">
                        <span class="metric-label">Run-Hours Today</span>
                        <span class="metric-value">${m.hoursToday} hrs</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Lifetime Hours</span>
                        <span class="metric-value">${m.hoursTotal.toLocaleString()} hrs</span>
                    </div>
                </div>

                <div class="machine-actions">
                    <button class="glass-btn" onclick="toggleMachineState(${index})">
                        <i class="fa-solid fa-power-off"></i> Toggle State
                    </button>
                    <button class="glass-btn edit-btn" onclick="openModal('machine-modal', ${index})">
                        <i class="fa-regular fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `;
    }).join("");
    applyRolePermissions();
}

window.toggleMachineState = function(index) {
    const machine = AppState.machines[index];
    const oldStatus = machine.status;
    
    if (oldStatus === "Running") {
        machine.status = "Idle";
    } else if (oldStatus === "Idle") {
        machine.status = "Running";
        machine.hoursToday = parseFloat((machine.hoursToday + 0.5).toFixed(1));
    } else {
        machine.status = "Idle";
    }

    logAudit("info", `Machine Asset: ${machine.name} state changed from ${oldStatus} to ${machine.status}`);
    showToast("Status Changed", `${machine.name} is now ${machine.status}`, "info");
    saveState();
};

function saveMachine(e) {
    e.preventDefault();
    const indexVal = document.getElementById("machine-index").value;
    const name = document.getElementById("mach-name").value;
    const power = parseFloat(document.getElementById("mach-power").value);
    const status = document.getElementById("mach-status").value;
    const hoursToday = parseFloat(document.getElementById("mach-hours-today").value);
    const hoursTotal = parseFloat(document.getElementById("mach-hours-total").value);

    const dataObj = { name, power, status, hoursToday, hoursTotal };

    if (indexVal !== "") {
        AppState.machines[parseInt(indexVal)] = dataObj;
        logAudit("info", `Configured parameters of machine: ${name}`);
        showToast("Machine Parameters Updated", `Saved configurations profiles for ${name}`, "success");
    } else {
        AppState.machines.push(dataObj);
        logAudit("success", `Added new factory machinery asset: ${name}`);
        showToast("Machine Registered", `Asset register saved for ${name}`, "success");
    }

    closeModal("machine-modal");
    saveState();
}

/**
 * SCREEN 6: ELECTRICITY UTILITY MOCK & AUDITS
 */
function runElectricityCalculatorFields() {
    const rate = parseFloat(document.getElementById("elec-rate").value) || 0.15;
    const machineName = document.getElementById("elec-machine").value;
    const hours = parseFloat(document.getElementById("elec-hours").value) || 0;

    const machine = AppState.machines.find(m => m.name === machineName);
    const c = AppState.settings.currency;

    if (machine) {
        const powerRating = machine.power;
        const consumption = powerRating * hours;
        const cost = consumption * rate;

        document.getElementById("elec-calc-power").innerText = `${powerRating.toFixed(1)} kW`;
        document.getElementById("elec-calc-consumption").innerText = `${consumption.toFixed(2)} kWh`;
        document.getElementById("elec-calc-cost").innerText = `${c}${cost.toFixed(2)}`;
    }
}

function saveElectricityLog(e) {
    e.preventDefault();
    const rate = parseFloat(document.getElementById("elec-rate").value);
    const machineName = document.getElementById("elec-machine").value;
    const hours = parseFloat(document.getElementById("elec-hours").value);

    const machine = AppState.machines.find(m => m.name === machineName);
    if (machine) {
        const consumption = machine.power * hours;
        const cost = consumption * rate;
        const today = new Date().toISOString().substring(0, 10);

        AppState.electricityLogs.unshift({
            date: today,
            machine: machineName,
            hours,
            consumption,
            rate,
            cost
        });

        // Track expense registry entry automatically as well
        AppState.expenses.unshift({
            date: today,
            category: "Electricity",
            amount: cost,
            notes: `Calculated utility expense log for: ${machineName} running ${hours} hrs`
        });

        logAudit("success", `Logged electricity utility consumption for ${machineName}: ${consumption.toFixed(1)} kWh, cost: ${AppState.settings.currency}${cost.toFixed(2)}`);
        showToast("Utility Audit Logged", "Logged energy run-cost and created corresponding expense registry", "success");
        document.getElementById("electricity-calc-form").reset();
        saveState();
    }
}

function renderElectricityLogs(filterType = "daily") {
    const tbody = document.getElementById("electricity-logs-body");
    if (!tbody) return;

    const c = AppState.settings.currency;
    const filteredLogs = AppState.electricityLogs; // Keep simple for display, but list chronological logs

    tbody.innerHTML = filteredLogs.map(l => `
        <tr>
            <td>${l.date}</td>
            <td><strong>${l.machine}</strong></td>
            <td>${l.hours} hrs</td>
            <td>${l.consumption.toLocaleString()} kWh</td>
            <td>${c}${l.rate.toFixed(3)}</td>
            <td><strong style="color:var(--status-danger)">${c}${l.cost.toFixed(2)}</strong></td>
        </tr>
    `).join("");
}

/**
 * SCREEN 7: WORKING MATERIALS INVENTORY CRUD
 */
function renderWorkingMaterialsTable() {
    const tbody = document.getElementById("working-materials-table-body");
    if (!tbody) return;

    const searchQuery = document.getElementById("wm-search").value.toLowerCase();
    const filterStatus = document.getElementById("wm-filter-status").value;

    const filtered = AppState.workingMaterials.filter(wm => {
        const matchesSearch = wm.name.toLowerCase().includes(searchQuery);
        const matchesStatus = filterStatus === "All" || wm.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const c = AppState.settings.currency;
    const u = AppState.settings.weightUnit;

    tbody.innerHTML = filtered.map((wm, index) => {
        let statusClass = "in-stock";
        if (wm.status === "Low Stock") statusClass = "low-stock";
        if (wm.status === "Out of Stock") statusClass = "out-of-stock";

        const marginPercentage = ((wm.price - wm.cost) / wm.price * 100).toFixed(1);

        return `
            <tr>
                <td><strong>${wm.name}</strong></td>
                <td>${wm.qty.toLocaleString()} ${u}</td>
                <td>${c}${wm.cost.toFixed(2)}</td>
                <td>${c}${wm.price.toFixed(2)}</td>
                <td><strong>${c}${(wm.qty * wm.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></td>
                <td><span style="color:var(--accent-green)">+${marginPercentage}%</span> markups</td>
                <td><span class="status-badge ${statusClass}">${wm.status}</span></td>
                <td>
                    <div class="table-action-btns">
                        <button class="table-action-btn edit-btn" onclick="openModal('working-material-modal', ${index})"><i class="fa-regular fa-edit"></i></button>
                        <button class="table-action-btn delete-btn" onclick="deleteWorkingMaterial(${index})"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
    applyRolePermissions();
}

function saveWorkingMaterial(e) {
    e.preventDefault();
    const indexVal = document.getElementById("wm-index").value;
    const name = document.getElementById("wm-name").value;
    const qty = parseFloat(document.getElementById("wm-qty").value);
    const cost = parseFloat(document.getElementById("wm-cost").value);
    const price = parseFloat(document.getElementById("wm-price").value);

    let status = "In Stock";
    if (qty === 0) status = "Out of Stock";
    else if (qty < 200) status = "Low Stock";

    const dataObj = { name, qty, cost, price, status };

    if (indexVal !== "") {
        AppState.workingMaterials[parseInt(indexVal)] = dataObj;
        logAudit("info", `Updated product inventory status: ${name}`);
        showToast("Product Item Updated", `Updated stock catalog variables for ${name}`, "success");
    } else {
        AppState.workingMaterials.push(dataObj);
        logAudit("success", `Registered new output product lines item: ${name}`);
        showToast("New Product Logged", `Registered item ${name} to stock catalog`, "success");
    }

    closeModal("working-material-modal");
    saveState();
}

window.deleteWorkingMaterial = function(index) {
    if (AppState.userRole === "Operator") return;
    const item = AppState.workingMaterials[index];
    if (confirm(`Are you sure you want to delete product item registry card: ${item.name}?`)) {
        AppState.workingMaterials.splice(index, 1);
        logAudit("warning", `Removed product line index from registry: ${item.name}`);
        showToast("Item Deleted", `${item.name} removed from inventory catalogs`, "warning");
        saveState();
    }
};

/**
 * SCREEN 8: SALES MANAGEMENT & INVOICING
 */
function runSalesCalculators() {
    const wmName = document.getElementById("sale-product").value;
    const qty = parseFloat(document.getElementById("sale-qty").value) || 0;
    const customPrice = parseFloat(document.getElementById("sale-price").value) || 0;

    const wm = AppState.workingMaterials.find(w => w.name === wmName);
    const c = AppState.settings.currency;

    if (wm) {
        document.getElementById("sale-stock-avail").innerText = `${wm.qty.toLocaleString()} ${AppState.settings.weightUnit}`;
        // Auto-fill price in form field if not modified
        if (!customPrice && document.activeElement !== document.getElementById("sale-price")) {
            document.getElementById("sale-price").value = wm.price;
        }
        
        const finalPrice = customPrice || wm.price;
        const total = qty * finalPrice;
        document.getElementById("sale-calc-total").innerText = `${c}${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
}

function saveSaleInvoice(e) {
    e.preventDefault();
    const customer = document.getElementById("sale-customer").value;
    const wmName = document.getElementById("sale-product").value;
    const qty = parseFloat(document.getElementById("sale-qty").value);
    const price = parseFloat(document.getElementById("sale-price").value);
    const paymentStatus = document.getElementById("sale-payment").value;
    const date = document.getElementById("sale-date").value;

    const wm = AppState.workingMaterials.find(w => w.name === wmName);

    if (!wm || wm.qty < qty) {
        showToast("Sales Validation Error", `Insufficient stock levels of ${wmName} product`, "error");
        return;
    }

    // Auto stock reduction rules
    wm.qty -= qty;
    if (wm.qty === 0) wm.status = "Out of Stock";
    else if (wm.qty < 200) wm.status = "Low Stock";

    const total = qty * price;
    const invoiceNum = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;

    AppState.sales.unshift({
        invoice: invoiceNum, customer, product: wmName, qty, price, total, date, paymentStatus
    });

    // Update customer stats
    const cust = AppState.customers.find(cs => cs.name === customer);
    if (cust) {
        cust.orders += 1;
        cust.status = paymentStatus;
    }

    logAudit("success", `Generated Invoice: Sold ${qty} kg ${wmName} to ${customer} worth ${AppState.settings.currency}${total.toLocaleString()}`);
    showToast("Invoice Generated", `Billed ${invoiceNum} totaling ${AppState.settings.currency}${total.toLocaleString()}`, "success");
    closeModal("sale-modal");
    saveState();
}

function renderSalesTable() {
    const tbody = document.getElementById("sales-table-body");
    if (!tbody) return;

    const searchQuery = document.getElementById("sales-search").value.toLowerCase();
    const filterPayment = document.getElementById("sales-filter-payment").value;

    const filtered = AppState.sales.filter(s => {
        const matchesSearch = s.invoice.toLowerCase().includes(searchQuery) || s.customer.toLowerCase().includes(searchQuery) || s.product.toLowerCase().includes(searchQuery);
        const matchesPayment = filterPayment === "All" || s.paymentStatus === filterPayment;
        return matchesSearch && matchesPayment;
    });

    const c = AppState.settings.currency;
    const u = AppState.settings.weightUnit;

    tbody.innerHTML = filtered.map(s => {
        const statusClass = s.paymentStatus === "Paid" ? "paid" : "pending";
        return `
            <tr>
                <td><strong>${s.invoice}</strong></td>
                <td>${s.customer}</td>
                <td>${s.product}</td>
                <td>${s.qty.toLocaleString()} ${u}</td>
                <td>${c}${s.price.toFixed(2)}</td>
                <td><strong>${c}${s.total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></td>
                <td>${s.date}</td>
                <td><span class="status-badge ${statusClass}">${s.paymentStatus}</span></td>
                <td>
                    <button class="table-action-btn" onclick="showToast('Invoice Preview', 'Simulating Invoice file printout layout...', 'info')">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

/**
 * SCREEN 9: OPERATIONAL EXPENSES LOGIC
 */
function saveExpense(e) {
    e.preventDefault();
    const category = document.getElementById("exp-category").value;
    const amount = parseFloat(document.getElementById("exp-amount").value);
    const date = document.getElementById("exp-date").value;
    const notes = document.getElementById("exp-notes").value;

    AppState.expenses.unshift({ date, category, amount, notes });
    logAudit("info", `Logged Expense: ${category} outflow worth ${AppState.settings.currency}${amount}`);
    showToast("Expense Recorded", `Saved expense entry: ${category}`, "success");
    document.getElementById("expense-log-form").reset();
    saveState();
}

function renderExpensesUI() {
    const tbody = document.getElementById("expenses-table-body");
    if (!tbody) return;

    const c = AppState.settings.currency;
    
    // Monthly total calculation
    const currentMonth = new Date().getMonth();
    const total = AppState.expenses
        .filter(e => new Date(e.date).getMonth() === currentMonth)
        .reduce((acc, curr) => acc + curr.amount, 0);

    document.getElementById("expenses-month-total").innerText = `Monthly Operations Total: ${c}${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    tbody.innerHTML = AppState.expenses.map((e, index) => `
        <tr>
            <td>${e.date}</td>
            <td><strong>${e.category}</strong></td>
            <td><span style="font-size:0.825rem; color:var(--text-muted)">${e.notes}</span></td>
            <td><strong style="color:var(--status-danger)">${c}${e.amount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></td>
            <td>
                <button class="table-action-btn delete-btn" onclick="deleteExpense(${index})"><i class="fa-regular fa-trash-can"></i></button>
            </td>
        </tr>
    `).join("");
    applyRolePermissions();
}

window.deleteExpense = function(index) {
    if (AppState.userRole === "Operator") return;
    const item = AppState.expenses[index];
    if (confirm(`Remove expense log entry for ${item.category}?`)) {
        AppState.expenses.splice(index, 1);
        logAudit("warning", `Removed expense item: ${item.category}`);
        showToast("Log Removed", "Expense registry entry deleted", "warning");
        saveState();
    }
};

/**
 * SCREEN 10: FINANCIAL PROFIT ANALYSIS
 */
function renderProfitSummaryKPIs() {
    const today = new Date().toISOString().substring(0, 10);
    const c = AppState.settings.currency;

    // Daily Profit Calculation
    const dailyRev = AppState.sales.filter(s => s.date === today).reduce((acc, curr) => acc + curr.total, 0);
    const dailyExp = AppState.expenses.filter(e => e.date === today).reduce((acc, curr) => acc + curr.amount, 0);
    const dailyRaw = AppState.productionBatches.filter(b => b.date === today).reduce((acc, curr) => acc + curr.cost, 0);
    const dailyElec = AppState.electricityLogs.filter(l => l.date === today).reduce((acc, curr) => acc + curr.cost, 0);
    const dailyProfit = dailyRev - (dailyExp + dailyRaw + dailyElec);

    // Weekly Profit Calculation (past 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weeklyRev = AppState.sales.filter(s => new Date(s.date) >= sevenDaysAgo).reduce((acc, curr) => acc + curr.total, 0);
    const weeklyExp = AppState.expenses.filter(e => new Date(e.date) >= sevenDaysAgo).reduce((acc, curr) => acc + curr.amount, 0);
    const weeklyRaw = AppState.productionBatches.filter(b => new Date(b.date) >= sevenDaysAgo).reduce((acc, curr) => acc + curr.cost, 0);
    const weeklyElec = AppState.electricityLogs.filter(l => new Date(l.date) >= sevenDaysAgo).reduce((acc, curr) => acc + curr.cost, 0);
    const weeklyProfit = weeklyRev - (weeklyExp + weeklyRaw + weeklyElec);

    // Monthly Profit Calculation (current month)
    const currentMonth = new Date().getMonth();
    const monthlyRev = AppState.sales.filter(s => new Date(s.date).getMonth() === currentMonth).reduce((acc, curr) => acc + curr.total, 0);
    const monthlyExp = AppState.expenses.filter(e => new Date(e.date).getMonth() === currentMonth).reduce((acc, curr) => acc + curr.amount, 0);
    const monthlyRaw = AppState.productionBatches.filter(b => new Date(b.date).getMonth() === currentMonth).reduce((acc, curr) => acc + curr.cost, 0);
    const monthlyElec = AppState.electricityLogs.filter(l => new Date(l.date).getMonth() === currentMonth).reduce((acc, curr) => acc + curr.cost, 0);
    const monthlyProfit = monthlyRev - (monthlyExp + monthlyRaw + monthlyElec);

    // Yearly Forecast (pro-rated monthly profit * 12)
    const yearlyForecast = monthlyProfit * 12;

    document.getElementById("profit-kpi-daily").innerText = `${c}${dailyProfit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
    document.getElementById("profit-kpi-weekly").innerText = `${c}${weeklyProfit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
    document.getElementById("profit-kpi-monthly").innerText = `${c}${monthlyProfit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
    document.getElementById("profit-kpi-yearly").innerText = `${c}${yearlyForecast.toLocaleString(undefined, {maximumFractionDigits:0})}`;

    // Color code indicator blocks
    adjustKPITextColors("profit-kpi-daily", dailyProfit);
    adjustKPITextColors("profit-kpi-weekly", weeklyProfit);
    adjustKPITextColors("profit-kpi-monthly", monthlyProfit);
    adjustKPITextColors("profit-kpi-yearly", yearlyForecast);
}

function adjustKPITextColors(elementId, value) {
    const el = document.getElementById(elementId);
    if (value < 0) {
        el.style.color = "var(--status-danger)";
    } else {
        el.style.color = "var(--accent-green)";
    }
}

function renderProfitCharts() {
    const costsCanvas = document.getElementById("profitCostsChart");
    const marginCanvas = document.getElementById("profitMarginChart");

    if (!costsCanvas || !marginCanvas) return;

    if (costsChartRef) costsChartRef.destroy();
    if (marginChartRef) marginChartRef.destroy();

    // 1. Costs Breakdown categories calculation (current month)
    const currentMonth = new Date().getMonth();
    const electricityExp = AppState.expenses.filter(e => e.category === "Electricity" && new Date(e.date).getMonth() === currentMonth).reduce((a,c) => a + c.amount, 0) + 
                            AppState.electricityLogs.filter(l => new Date(l.date).getMonth() === currentMonth).reduce((a,c) => a + c.cost, 0);
    const salariesExp = AppState.expenses.filter(e => e.category === "Salaries" && new Date(e.date).getMonth() === currentMonth).reduce((a,c) => a + c.amount, 0);
    const maintenanceExp = AppState.expenses.filter(e => e.category === "Maintenance" && new Date(e.date).getMonth() === currentMonth).reduce((a,c) => a + c.amount, 0);
    const transportExp = AppState.expenses.filter(e => e.category === "Transport" && new Date(e.date).getMonth() === currentMonth).reduce((a,c) => a + c.amount, 0);
    const miscExp = AppState.expenses.filter(e => e.category === "Miscellaneous" && new Date(e.date).getMonth() === currentMonth).reduce((a,c) => a + c.amount, 0);
    const rawMaterialExp = AppState.productionBatches.filter(b => new Date(b.date).getMonth() === currentMonth).reduce((a,c) => a + c.cost, 0);

    costsChartRef = new Chart(costsCanvas, {
        type: 'doughnut',
        data: {
            labels: ['Raw Materials', 'Electricity Utilities', 'Staff Salaries', 'Machinery Maintenance', 'Logistics & Transport', 'Misc'],
            datasets: [{
                data: [rawMaterialExp, electricityExp, salariesExp, maintenanceExp, transportExp, miscExp],
                backgroundColor: [
                    'hsl(210, 100%, 55%)',
                    'hsl(350, 80%, 55%)',
                    'hsl(142, 70%, 45%)',
                    'hsl(38, 92%, 50%)',
                    'hsl(200, 95%, 50%)',
                    'hsl(220, 10%, 50%)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: 'hsl(220, 12%, 76%)', font: { family: 'Inter', size: 10 } }
                }
            }
        }
    });

    // 2. Revenues vs Profit Comparison Chart (Last 3 calendar months)
    const monthLabels = ["May", "June", "July"];
    const revenues = [120000, 138000, AppState.sales.filter(s => new Date(s.date).getMonth() === currentMonth).reduce((a,c) => a + c.total, 0)];
    
    // Simulated past monthly costs (since we only seed June/July)
    const rawMatCosts = [32000, 38000, rawMaterialExp];
    const generalExps = [58000, 61000, salariesExp + maintenanceExp + transportExp + miscExp + electricityExp];
    const margins = [
        revenues[0] - (rawMatCosts[0] + generalExps[0]),
        revenues[1] - (rawMatCosts[1] + generalExps[1]),
        revenues[2] - (rawMatCosts[2] + generalExps[2])
    ];

    marginChartRef = new Chart(marginCanvas, {
        type: 'bar',
        data: {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Gross Revenues',
                    data: revenues,
                    backgroundColor: 'hsla(210, 100%, 55%, 0.65)',
                    borderColor: 'hsl(210, 100%, 55%)',
                    borderWidth: 1
                },
                {
                    label: 'Net Profits',
                    data: margins,
                    backgroundColor: 'hsla(142, 70%, 45%, 0.65)',
                    borderColor: 'hsl(142, 70%, 45%)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'hsl(220, 12%, 76%)', font: { family: 'Inter' } }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'hsl(220, 10%, 50%)' }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'hsl(220, 10%, 50%)' }
                }
            }
        }
    });
}

/**
 * SCREEN 11: REPORTS AND EXPORTS MODULES
 */
function updateReportPreview() {
    const viewport = document.getElementById("report-preview-viewport");
    if (!viewport) return;

    const activeReport = document.querySelector(".report-type-btn.active").getAttribute("data-report");
    const timeframe = document.getElementById("report-timeframe").value;
    const c = AppState.settings.currency;
    const u = AppState.settings.weightUnit;

    let content = "";
    if (activeReport === "production") {
        content = `
            <table class="management-table">
                <thead>
                    <tr>
                        <th>Batch Code</th>
                        <th>Material Processed</th>
                        <th>Yield Output</th>
                        <th>Waste Loss</th>
                        <th>Calculated Cost</th>
                        <th>Efficiency</th>
                        <th>Process Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.productionBatches.map(b => `
                        <tr>
                            <td><strong>${b.batch}</strong></td>
                            <td>${b.qtyUsed} ${u} ${b.materialUsed}</td>
                            <td>${b.qtyOutput} ${u} ${b.wmProduced}</td>
                            <td>${b.waste} ${u}</td>
                            <td>${c}${b.cost.toFixed(2)}</td>
                            <td>${b.efficiency}%</td>
                            <td>${b.date}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } else if (activeReport === "sales") {
        content = `
            <table class="management-table">
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Customer Company</th>
                        <th>Product Item</th>
                        <th>Qty Sold</th>
                        <th>Total Billing</th>
                        <th>Fulfillment Date</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.sales.map(s => `
                        <tr>
                            <td><strong>${s.invoice}</strong></td>
                            <td>${s.customer}</td>
                            <td>${s.product}</td>
                            <td>${s.qty} ${u}</td>
                            <td>${c}${s.total.toFixed(2)}</td>
                            <td>${s.date}</td>
                            <td>${s.paymentStatus}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } else if (activeReport === "inventory") {
        content = `
            <table class="management-table">
                <thead>
                    <tr>
                        <th>Classification</th>
                        <th>Item Label</th>
                        <th>Available Stock</th>
                        <th>Pricing Metrics</th>
                        <th>Total Value</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.rawMaterials.map(r => `
                        <tr>
                            <td>Raw Material</td>
                            <td><strong>${r.name}</strong></td>
                            <td>${r.qty.toLocaleString()} ${u}</td>
                            <td>${c}${r.cost.toFixed(2)}/kg</td>
                            <td>${c}${(r.qty * r.cost).toFixed(2)}</td>
                            <td>${r.status}</td>
                        </tr>
                    `).join("")}
                    ${AppState.workingMaterials.map(w => `
                        <tr>
                            <td>Product Line</td>
                            <td><strong>${w.name}</strong></td>
                            <td>${w.qty.toLocaleString()} ${u}</td>
                            <td>${c}${w.price.toFixed(2)}/kg</td>
                            <td>${c}${(w.qty * w.price).toFixed(2)}</td>
                            <td>${w.status}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } else if (activeReport === "electricity") {
        content = `
            <table class="management-table">
                <thead>
                    <tr>
                        <th>Logged Date</th>
                        <th>Machine Asset</th>
                        <th>Hours Ran</th>
                        <th>Consumption</th>
                        <th>Utility Rate</th>
                        <th>Calculated Cost</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.electricityLogs.map(l => `
                        <tr>
                            <td>${l.date}</td>
                            <td><strong>${l.machine}</strong></td>
                            <td>${l.hours} hrs</td>
                            <td>${l.consumption.toFixed(1)} kWh</td>
                            <td>${c}${l.rate.toFixed(3)}</td>
                            <td>${c}${l.cost.toFixed(2)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } else if (activeReport === "profit") {
        const totalRev = AppState.sales.reduce((a,c) => a + c.total, 0);
        const rawCosts = AppState.productionBatches.reduce((a,c) => a + c.cost, 0);
        const operExps = AppState.expenses.reduce((a,c) => a + c.amount, 0);
        const netProf = totalRev - (rawCosts + operExps);
        content = `
            <div style="padding:24px;">
                <h4 style="margin-bottom:16px;">Financial Balance Sheet Breakdown</h4>
                <div class="calc-preview-card" style="display:flex; flex-direction:column; gap:12px;">
                    <div class="calc-preview-row"><span>Gross Revenues Accumulated:</span><strong>${c}${totalRev.toLocaleString()}</strong></div>
                    <div class="calc-preview-row"><span>Raw Processing Costs:</span><strong style="color:var(--status-danger)">-${c}${rawCosts.toLocaleString()}</strong></div>
                    <div class="calc-preview-row"><span>General & Admin Operating Expenses:</span><strong style="color:var(--status-danger)">-${c}${operExps.toLocaleString()}</strong></div>
                    <div class="calc-preview-row" style="border-top:1px solid rgba(255,255,255,0.1); padding-top:12px;">
                        <span>Accumulated Net EBITDA Profit:</span><strong style="color:var(--accent-green); font-size:1.2rem;">${c}${netProf.toLocaleString()}</strong>
                    </div>
                </div>
            </div>
        `;
    }

    viewport.innerHTML = content;
}

function exportReportExcel() {
    const activeReport = document.querySelector(".report-type-btn.active").getAttribute("data-report");
    const timeframe = document.getElementById("report-timeframe").value;
    
    // Simulate generation of Excel sheet via CSV output stream download
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (activeReport === "production") {
        csvContent += "Batch,Raw Material,Qty Used (kg),Product Output,Qty Output (kg),Waste (kg),Calculated Cost,Efficiency (%),Date\n";
        AppState.productionBatches.forEach(b => {
            csvContent += `${b.batch},${b.materialUsed},${b.qtyUsed},${b.wmProduced},${b.qtyOutput},${b.waste},${b.cost.toFixed(2)},${b.efficiency},${b.date}\n`;
        });
    } else if (activeReport === "sales") {
        csvContent += "Invoice,Customer,Product,Qty Sold (kg),Price per kg,Invoice Total,Date,Payment Status\n";
        AppState.sales.forEach(s => {
            csvContent += `${s.invoice},${s.customer},${s.product},${s.qty},${s.price},${s.total.toFixed(2)},${s.date},${s.paymentStatus}\n`;
        });
    } else {
        csvContent += "Registry Classification,Item Name,Metric Quantity,Price/Cost Rate,Estimated Sum Total,Stock Status\n";
        AppState.rawMaterials.forEach(r => {
            csvContent += `Raw Material,${r.name},${r.qty},${r.cost},${(r.qty * r.cost).toFixed(2)},${r.status}\n`;
        });
        AppState.workingMaterials.forEach(w => {
            csvContent += `Product Line,${w.name},${w.qty},${w.price},${(w.qty * w.price).toFixed(2)},${w.status}\n`;
        });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `optimapro_${activeReport}_report_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logAudit("info", `Exported data tables as spreadsheet file: optimapro_${activeReport}_report_${timeframe}.csv`);
    showToast("Spreadsheet Exported", "Report CSV spreadsheet downloaded successfully", "success");
}

function exportReportPDF() {
    window.print();
    logAudit("info", "Triggered document print layout render for PDF compiler");
    showToast("Compiler Initialized", "Generating printable document stream", "info");
}

/**
 * SCREEN 12: SUPPLIERS DIRECTORY CRUD
 */
function renderSuppliersTable() {
    const tbody = document.getElementById("suppliers-table-body");
    if (!tbody) return;

    const searchQuery = document.getElementById("supplier-search").value.toLowerCase();
    const filtered = AppState.suppliers.filter(s => s.name.toLowerCase().includes(searchQuery) || s.rep.toLowerCase().includes(searchQuery));

    const c = AppState.settings.currency;

    tbody.innerHTML = filtered.map((s, index) => {
        const isPending = s.pending > 0;
        return `
            <tr>
                <td><strong>${s.name}</strong></td>
                <td>${s.rep}</td>
                <td>${s.phone}</td>
                <td><code style="color:var(--text-accent)">${s.email}</code></td>
                <td><span class="status-badge completed">Verified</span></td>
                <td><strong style="color:${isPending ? 'var(--status-warning)' : 'var(--text-muted)'}">${c}${s.pending.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></td>
                <td>
                    <div class="table-action-btns">
                        <button class="table-action-btn edit-btn" onclick="openModal('supplier-modal', ${index})"><i class="fa-regular fa-edit"></i></button>
                        <button class="table-action-btn delete-btn" onclick="deleteSupplier(${index})"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
    applyRolePermissions();
}

function saveSupplier(e) {
    e.preventDefault();
    const indexVal = document.getElementById("supplier-index").value;
    const name = document.getElementById("sup-name").value;
    const rep = document.getElementById("sup-rep").value;
    const phone = document.getElementById("sup-phone").value;
    const email = document.getElementById("sup-email").value;
    const pending = parseFloat(document.getElementById("sup-pending").value) || 0;

    const dataObj = { name, rep, phone, email, pending };

    if (indexVal !== "") {
        AppState.suppliers[parseInt(indexVal)] = dataObj;
        logAudit("info", `Updated supplier details records: ${name}`);
        showToast("Supplier Updated", `Saved profiles modifications for ${name}`, "success");
    } else {
        AppState.suppliers.push(dataObj);
        logAudit("success", `Registered new supply-chain supplier: ${name}`);
        showToast("Supplier Registered", `Added ${name} to partners network`, "success");
    }

    closeModal("supplier-modal");
    saveState();
}

window.deleteSupplier = function(index) {
    if (AppState.userRole === "Operator") return;
    const item = AppState.suppliers[index];
    if (confirm(`Remove Supplier catalog card for ${item.name}?`)) {
        AppState.suppliers.splice(index, 1);
        logAudit("warning", `Removed supplier partner card: ${item.name}`);
        showToast("Partner Removed", `${item.name} removed from registry index`, "warning");
        saveState();
    }
};

/**
 * SCREEN 13: CUSTOMERS PORTAL CRUD
 */
function renderCustomersTable() {
    const tbody = document.getElementById("customers-table-body");
    if (!tbody) return;

    const searchQuery = document.getElementById("customer-search").value.toLowerCase();
    const filtered = AppState.customers.filter(c => c.name.toLowerCase().includes(searchQuery) || c.rep.toLowerCase().includes(searchQuery));

    tbody.innerHTML = filtered.map((c, index) => {
        const badgeClass = c.status === "Paid" ? "paid" : "pending";
        return `
            <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.rep}</td>
                <td>${c.phone}</td>
                <td><code style="color:var(--text-accent)">${c.email}</code></td>
                <td>${c.orders} invoices logged</td>
                <td><span class="status-badge ${badgeClass}">${c.status}</span></td>
                <td>
                    <div class="table-action-btns">
                        <button class="table-action-btn edit-btn" onclick="openModal('customer-modal', ${index})"><i class="fa-regular fa-edit"></i></button>
                        <button class="table-action-btn delete-btn" onclick="deleteCustomer(${index})"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
    applyRolePermissions();
}

function saveCustomer(e) {
    e.preventDefault();
    const indexVal = document.getElementById("customer-index").value;
    const name = document.getElementById("cust-name").value;
    const rep = document.getElementById("cust-rep").value;
    const phone = document.getElementById("cust-phone").value;
    const email = document.getElementById("cust-email").value;

    if (indexVal !== "") {
        const existing = AppState.customers[parseInt(indexVal)];
        existing.name = name;
        existing.rep = rep;
        existing.phone = phone;
        existing.email = email;
        logAudit("info", `Updated Customer index metrics for: ${name}`);
        showToast("Customer Saved", `Saved client profile details for ${name}`, "success");
    } else {
        AppState.customers.push({
            name, rep, phone, email, orders: 0, status: "Paid"
        });
        logAudit("success", `Registered customer profile: ${name}`);
        showToast("Customer Registered", `Registered client: ${name}`, "success");
    }

    closeModal("customer-modal");
    saveState();
}

window.deleteCustomer = function(index) {
    if (AppState.userRole === "Operator") return;
    const item = AppState.customers[index];
    if (confirm(`Remove Customer record for ${item.name}?`)) {
        AppState.customers.splice(index, 1);
        logAudit("warning", `Deleted customer account catalog: ${item.name}`);
        showToast("Account Deleted", `${item.name} removed from customer profiles`, "warning");
        saveState();
    }
};

/**
 * SCREEN 14: SETTINGS CORE BACKUP DATABASE
 */
function backupDatabase() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "optimapro_backup_db.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    logAudit("success", "Initiated complete workspace systems database backup dump.");
    showToast("Backup Complete", "System JSON workspace archive downloaded successfully", "success");
}

/**
 * TOAST ALERTS & BANNER NOTIFICATIONS CONTROLLERS
 */
window.showToast = function(title, message, type = "info") {
    const stack = document.getElementById("toast-stack");
    if (!stack) return;

    let icon = "fa-info-circle";
    if (type === "success") icon = "fa-circle-check";
    else if (type === "warning") icon = "fa-circle-exclamation";
    else if (type === "error") icon = "fa-triangle-exclamation";

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    stack.appendChild(toast);

    // Fade and slide removal timer
    setTimeout(() => {
        toast.classList.add("removing");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
};

function checkLowStocksAlerts() {
    let triggered = false;
    AppState.rawMaterials.forEach(r => {
        if (r.qty < 500 && r.qty > 0 && r.status !== "Low Stock") {
            r.status = "Low Stock";
            logAudit("warning", `Low stock notice: ${r.name} quantity fell below 500 kg threshold`);
            showToast("Inventory Alert", `Raw Stock of ${r.name} is running Low!`, "warning");
            triggered = true;
        }
    });

    AppState.workingMaterials.forEach(w => {
        if (w.qty < 200 && w.qty > 0 && w.status !== "Low Stock") {
            w.status = "Low Stock";
            logAudit("warning", `Low stock notice: Product line ${w.name} inventory fell below 200 kg threshold`);
            showToast("Inventory Alert", `Working Stock of ${w.name} is running Low!`, "warning");
            triggered = true;
        }
    });
}

function showSystemNotifications() {
    // Generate notification list dropdown actions (optional popup bindings)
    document.getElementById("notif-bell-btn").addEventListener("click", () => {
        const lows = [...AppState.rawMaterials.filter(r => r.qty < 500), ...AppState.workingMaterials.filter(w => w.qty < 200)];
        if (lows.length > 0) {
            showToast("Critical Alerts Stack", `Found ${lows.length} material lines below optimal replenishment margins. Check logs!`, "error");
        } else {
            showToast("Notifications Inbox", "All systems operational. No critical notifications pending.", "info");
        }
    });
}

/**
 * BARCODE SCANNING & QR SIMULATION EVENT
 */
function executeBarcodeScanSimulation() {
    const simOption = document.getElementById("scan-sim-value").value;
    closeModal("barcode-modal");

    if (simOption === "raw-copper") {
        switchTab("raw-materials");
        document.getElementById("raw-search").value = "Copper";
        renderRawMaterialsTable();
        showToast("Barcode Resolved", "Scanned Raw Copper Ore registry card", "success");
        logAudit("info", "Resolved scanned barcode tag input: Pure Copper Ore");
    } else if (simOption === "raw-steel") {
        switchTab("raw-materials");
        document.getElementById("raw-search").value = "Steel";
        renderRawMaterialsTable();
        showToast("Barcode Resolved", "Scanned Raw Steel Ingots stock", "success");
    } else if (simOption === "prod-wire") {
        switchTab("working-materials");
        document.getElementById("wm-search").value = "Wire";
        renderWorkingMaterialsTable();
        showToast("Barcode Resolved", "Resolved product: Copper Wire Coils 10mm", "success");
    } else if (simOption === "prod-beam") {
        switchTab("working-materials");
        document.getElementById("wm-search").value = "Beam";
        renderWorkingMaterialsTable();
        showToast("Barcode Resolved", "Resolved product: H-Beam structural steel", "success");
    }
}
