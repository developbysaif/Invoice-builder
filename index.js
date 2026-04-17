document.addEventListener('DOMContentLoaded', function () {
            // UI Elements
            const homeContainer = document.getElementById('homeContainer');
            const authContainer = document.getElementById('authContainer');
            const dashboardContainer = document.getElementById('dashboardContainer');
            const invoiceBuilderContainer = document.getElementById('invoiceBuilderContainer');
            const loginPage = document.getElementById('loginPage');
            const signupPage = document.getElementById('signupPage');
            const getStartedBtn = document.getElementById('getStartedBtn');
            const showSignupBtn = document.getElementById('showSignup');
            const showLoginBtn = document.getElementById('showLogin');
            const loginBtn = document.getElementById('loginBtn');
            const signupBtn = document.getElementById('signupBtn');
            const guestBtn = document.getElementById('guestBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const createInvoiceBtn = document.getElementById('createInvoiceBtn');
            const darkModeToggle = document.getElementById('darkModeToggle');
            const darkModeIcon = document.getElementById('darkModeIcon');

            // Signup type buttons
            const signupTypeButtons = document.querySelectorAll('.signup-type');
            const serviceTypeButtons = document.querySelectorAll('.service-type');

            // Signup type button functionality
            signupTypeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    signupTypeButtons.forEach(btn => btn.classList.remove('active', 'border-accent', 'bg-accent', 'text-white'));
                    this.classList.add('active', 'border-accent', 'bg-accent', 'text-white');
                });
            });

            // Service type button functionality
            serviceTypeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    serviceTypeButtons.forEach(btn => btn.classList.remove('active', 'border-accent', 'bg-accent', 'text-white'));
                    this.classList.add('active', 'border-accent', 'bg-accent', 'text-white');
                });
            });

            // Check if user is already logged in
            const isLoggedIn = localStorage.getItem('userLoggedIn');
            if (isLoggedIn) {
                showDashboard();
            } else {
                showHome();
            }

            // Get Started button handler
            getStartedBtn.addEventListener('click', function () {
                showAuth();
            });

            // Authentication handlers
            showSignupBtn.addEventListener('click', function (e) {
                e.preventDefault();
                loginPage.classList.add('hidden');
                signupPage.classList.remove('hidden');
            });

            showLoginBtn.addEventListener('click', function (e) {
                e.preventDefault();
                signupPage.classList.add('hidden');
                loginPage.classList.remove('hidden');
            });

            guestBtn.addEventListener('click', function () {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userType', 'guest');
                showDashboard();
            });

            loginBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if (email && password) {
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    showDashboard();
                } else {
                    alert('Please enter both email and password');
                }
            });

            signupBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const firstname = document.getElementById('firstname').value;
                const lastname = document.getElementById('lastname').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;

                if (!firstname || !lastname || !email || !password || !confirmPassword) {
                    alert('Please fill all required fields');
                    return;
                }

                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }

                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', `${firstname} ${lastname}`);
                showDashboard();
            });

            // Logout functionality
            logoutBtn.addEventListener('click', function () {
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem('userLoggedIn');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userType');
                    showAuth();
                }
            });

            // Create invoice button
            createInvoiceBtn.addEventListener('click', function () {
                showInvoiceBuilder();
            });

            // Dark mode toggle
            darkModeToggle.addEventListener('click', function () {
                document.documentElement.classList.toggle('dark');
                if (document.documentElement.classList.contains('dark')) {
                    darkModeIcon.className = 'fas fa-sun text-yellow-500';
                } else {
                    darkModeIcon.className = 'fas fa-moon text-gray-600';
                }
            });

            // Function to show home
            function showHome() {
                homeContainer.classList.remove('hidden');
                homeContainer.classList.add('flex');
                authContainer.classList.add('hidden');
                dashboardContainer.classList.add('hidden');
                invoiceBuilderContainer.classList.add('hidden');
                document.body.classList.remove('bg-gray-50', 'dark:bg-gray-900');
                document.body.classList.add('bg-cyan-950', 'dark:bg-gray-900');
            }

            // Function to show auth
            function showAuth() {
                homeContainer.classList.add('hidden');
                authContainer.classList.remove('hidden');
                authContainer.classList.add('flex');
                dashboardContainer.classList.add('hidden');
                invoiceBuilderContainer.classList.add('hidden');
                document.body.classList.remove('bg-gray-50', 'dark:bg-gray-900');
                document.body.classList.add('bg-cyan-950', 'dark:bg-gray-900');
                
                // Reset forms
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('firstname').value = '';
                document.getElementById('lastname').value = '';
                document.getElementById('signup-email').value = '';
                document.getElementById('signup-password').value = '';
                document.getElementById('confirm-password').value = '';
                
                // Show login page by default
                loginPage.classList.remove('hidden');
                signupPage.classList.add('hidden');
            }

            // Function to show dashboard
            function showDashboard() {
                homeContainer.classList.add('hidden');
                authContainer.classList.add('hidden');
                dashboardContainer.classList.remove('hidden');
                invoiceBuilderContainer.classList.add('hidden');
                document.body.classList.remove('bg-cyan-950', 'dark:bg-gray-900');
                document.body.classList.add('bg-gray-50', 'dark:bg-gray-900');
                populateDashboardTable();
            }

            function populateDashboardTable() {
                const tableBody = document.querySelector('#dashboardContainer table tbody');
                const savedInvoices = JSON.parse(localStorage.getItem('allInvoices') || '[]');
                
                if (savedInvoices.length === 0) {
                    tableBody.innerHTML = `
                        <tr>
                            <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                <i class="fas fa-file-invoice text-4xl mb-3 text-accent"></i>
                                <p>No invoices created yet</p>
                                <button id="createFirstInvoiceBtn" class="mt-4 bg-accent text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                                    Create Your First Invoice
                                </button>
                            </td>
                        </tr>
                    `;
                    document.getElementById('createFirstInvoiceBtn')?.addEventListener('click', showInvoiceBuilder);
                    return;
                }

                tableBody.innerHTML = '';
                savedInvoices.forEach((invoice, index) => {
                    const row = document.createElement('tr');
                    row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer';
                    row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#${invoice.invoiceNumber}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Professional</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${invoice.receiver.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${invoice.issueDate}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${invoice.dueDate}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-accent font-semibold">${invoice.total}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button class="text-gray-600 hover:text-accent mr-3 view-invoice" data-index="${index}"><i class="fas fa-eye"></i></button>
                            <button class="text-red-600 hover:text-red-800 delete-invoice" data-index="${index}"><i class="fas fa-trash"></i></button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                // Add event listeners
                document.querySelectorAll('.view-invoice').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const idx = btn.dataset.index;
                        loadInvoice(savedInvoices[idx]);
                    });
                });

                document.querySelectorAll('.delete-invoice').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this invoice?')) {
                            const idx = btn.dataset.index;
                            savedInvoices.splice(idx, 1);
                            localStorage.setItem('allInvoices', JSON.stringify(savedInvoices));
                            populateDashboardTable();
                        }
                    });
                });
            }

            function loadInvoice(invoiceData) {
                // Pre-fill builder with data
                document.getElementById('invoiceNumber').value = invoiceData.invoiceNumber;
                document.getElementById('issueDate').value = invoiceData.issueDate;
                document.getElementById('dueDate').value = invoiceData.dueDate;
                document.getElementById('senderName').textContent = invoiceData.sender.name;
                document.getElementById('senderDetails').textContent = invoiceData.sender.details;
                document.getElementById('receiverName').textContent = invoiceData.receiver.name;
                document.getElementById('receiverDetails').textContent = invoiceData.receiver.details;
                document.getElementById('invoiceTerms').value = invoiceData.terms;
                document.getElementById('currencySelect').value = invoiceData.currency;
                
                const tableBody = document.querySelector('#invoiceTable tbody');
                tableBody.innerHTML = '';
                invoiceData.items.forEach(item => {
                    const row = tableBody.insertRow();
                    row.innerHTML = `
                        <td class="p-2 border-b dark:border-gray-600"><input type="text" value="${item.item}" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm"></td>
                        <td class="p-2 border-b dark:border-gray-600 text-right"><input type="number" value="${item.qty}" class="w-16 text-right border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm qty"></td>
                        <td class="p-2 border-b dark:border-gray-600 text-right"><input type="number" value="${item.price}" class="w-20 text-right border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm price"></td>
                        <td class="p-2 border-b dark:border-gray-600 text-right total">${item.total}</td>
                        <td class="p-2 border-b dark:border-gray-600 text-center"><button class="text-red-500 hover:text-red-700 remove">&times;</button></td>`;
                    
                    row.querySelector('.qty').addEventListener('input', updateTotals);
                    row.querySelector('.price').addEventListener('input', updateTotals);
                    row.querySelector('.remove').addEventListener('click', () => { row.remove(); updateTotals(); });
                });
                
                showInvoiceBuilder();
                updateTotals();
            }

            let invoiceBuilderInitialized = false;
            // Function to show invoice builder
            function showInvoiceBuilder() {
                homeContainer.classList.add('hidden');
                authContainer.classList.add('hidden');
                dashboardContainer.classList.add('hidden');
                invoiceBuilderContainer.classList.remove('hidden');
                document.body.classList.remove('bg-cyan-950', 'dark:bg-gray-900');
                document.body.classList.add('bg-gray-100', 'dark:bg-gray-900');
                
                if (!invoiceBuilderInitialized) {
                    initInvoiceBuilder();
                    invoiceBuilderInitialized = true;
                }
            }

            // Make functions globally available
            window.showDashboard = showDashboard;
        });

        function initInvoiceBuilder() {
            // Elements
            const addItemBtn = document.getElementById('addItem');
            const tableBody = document.querySelector('#invoiceTable tbody');
            const subtotalEl = document.getElementById('subtotal');
            const taxEl = document.getElementById('tax');
            const totalEl = document.getElementById('total');
            const formModal = document.getElementById('formModal');
            const openSenderModal = document.getElementById('openSenderModal');
            const openReceiverModal = document.getElementById('openReceiverModal');
            const closeModal = document.getElementById('closeModal');
            const cancelBtn = document.getElementById('cancelBtn');
            const saveBtn = document.getElementById('saveBtn');
            const formTitle = document.getElementById('formTitle');
            const senderSection = document.getElementById('senderSection');
            const receiverSection = document.getElementById('receiverSection');
            const senderName = document.getElementById('senderName');
            const senderDetails = document.getElementById('senderDetails');
            const receiverName = document.getElementById('receiverName');
            const receiverDetails = document.getElementById('receiverDetails');
            
            // Custom field elements
            const addCustomFieldBtn = document.getElementById('addCustomFieldBtn');
            const customFieldModal = document.getElementById('customFieldModal');
            const closeCustomModal = document.getElementById('closeCustomModal');
            const cancelCustomBtn = document.getElementById('cancelCustomBtn');
            const saveCustomBtn = document.getElementById('saveCustomBtn');
            const customFieldForm = document.getElementById('customFieldForm');
            const fieldType = document.getElementById('fieldType');
            const fieldValueContainer = document.getElementById('fieldValueContainer');
            const customFieldsSection = document.getElementById('customFieldsSection');
            
            // New buttons
            const addCompanyInfoBtn = document.getElementById('addCompanyInfoBtn');
            const addClientInfoBtn = document.getElementById('addClientInfoBtn');
            const addDescriptionBtn = document.getElementById('addDescriptionBtn');
            const addPaymentBtn = document.getElementById('addPaymentBtn');
            const deleteInvoiceBtn = document.getElementById('deleteInvoiceBtn');
            const downloadPdfBtn = document.getElementById('downloadPdfBtn');
            const saveInvoiceBtn = document.getElementById('saveInvoiceBtn');
            
            // Sections
            const companyInfoSection = document.getElementById('companyInfoSection');
            const clientInfoSection = document.getElementById('clientInfoSection');
            const descriptionSection = document.getElementById('descriptionSection');
            const paymentSection = document.getElementById('paymentSection');
            
            // Logo upload
            const logoUpload = document.getElementById('logoUpload');
            const logoInput = document.getElementById('logoInput');
            const logoPreview = document.getElementById('logoPreview');
            const logoText = document.getElementById('logoText');
            
            // Currency
            const currencySelect = document.getElementById('currencySelect');
            
            let currentEditing = 'sender';
            let customFieldCount = 0;

            // Currency conversion rates (example rates)
            const exchangeRates = {
                USD: 1,
                PKR: 278.50,
                EUR: 0.92,
                GBP: 0.79
            };

            // Currency symbols
            const currencySymbols = {
                USD: '$',
                PKR: '₨',
                EUR: '€',
                GBP: '£'
            };

            // Logo Upload Functionality
            logoUpload.addEventListener('click', function() {
                logoInput.click();
            });

            logoUpload.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('bg-green-100', 'border-green-400');
            });

            logoUpload.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.classList.remove('bg-green-100', 'border-green-400');
            });

            logoUpload.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('bg-green-100', 'border-green-400');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleLogoFile(files[0]);
                }
            });

            logoInput.addEventListener('change', function(e) {
                if (this.files.length > 0) {
                    handleLogoFile(this.files[0]);
                }
            });

            function handleLogoFile(file) {
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        logoPreview.src = e.target.result;
                        logoPreview.classList.remove('hidden');
                        logoText.textContent = 'Logo uploaded';
                        logoText.classList.add('text-green-600');
                    };
                    reader.readAsDataURL(file);
                }
            }

            // Modal Functionality
            let currentModalType = 'sender';

            // Open sender modal
            openSenderModal.addEventListener('click', function(e) {
                e.stopPropagation();
                currentModalType = 'sender';
                formTitle.textContent = 'Set Sender Data';
                openModal();
            });

            // Open receiver modal
            openReceiverModal.addEventListener('click', function(e) {
                e.stopPropagation();
                currentModalType = 'receiver';
                formTitle.textContent = 'Set Receiver Data';
                openModal();
            });

            // Click on sender section
            senderSection.addEventListener('click', function() {
                currentModalType = 'sender';
                formTitle.textContent = 'Set Sender Data';
                openModal();
            });

            // Click on receiver section
            receiverSection.addEventListener('click', function() {
                currentModalType = 'receiver';
                formTitle.textContent = 'Set Receiver Data';
                openModal();
            });

            function openModal() {
                formModal.classList.remove('hidden');
                // Pre-fill form with existing data if available
                if (currentModalType === 'sender') {
                    document.getElementById('companyName').value = document.getElementById('senderName').textContent;
                    document.getElementById('emailModal').value = 'jafferi2008@gmail.com';
                }
            }

            // Close modal
            closeModal.addEventListener('click', closeModalFunc);
            cancelBtn.addEventListener('click', closeModalFunc);

            function closeModalFunc() {
                formModal.classList.add('hidden');
            }

            // Save modal data
            saveBtn.addEventListener('click', function() {
                const companyName = document.getElementById('companyName').value;
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('emailModal').value;
                const phone = document.getElementById('phone').value;
                const address1 = document.getElementById('address1').value;
                const city = document.getElementById('city').value;
                const country = document.getElementById('country').value;

                if (currentModalType === 'sender') {
                    document.getElementById('senderName').textContent = companyName || 'Sender name';
                    document.getElementById('senderDetails').textContent = 
                        [email, phone, address1, city, country].filter(Boolean).join(', ') || 'Sender contact details';
                } else {
                    document.getElementById('receiverName').textContent = companyName || 'Recipient name';
                    document.getElementById('receiverDetails').textContent = 
                        [email, phone, address1, city, country].filter(Boolean).join(', ') || 'Recipient contact details';
                }

                closeModalFunc();
            });

            // Currency change handler
            currencySelect.addEventListener('change', updateTotals);
            
            // Format currency based on selection
            function formatCurrency(amount) {
                const currency = currencySelect.value;
                const symbol = currencySymbols[currency];
                const convertedAmount = amount * exchangeRates[currency];
                return `${symbol}${convertedAmount.toFixed(2)}`;
            }
            
            // Add company info
            addCompanyInfoBtn.addEventListener('click', () => {
                if (companyInfoSection.classList.contains('hidden')) {
                    companyInfoSection.classList.remove('hidden');
                    companyInfoSection.innerHTML = `
                        <div class="border border-accent rounded p-4 form-animation bg-white dark:bg-gray-700">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-semibold text-gray-700 dark:text-gray-300">Company Information</h3>
                                <button class="text-red-500 text-sm hover:text-red-700 remove-section" data-section="companyInfoSection">&times;</button>
                            </div>
                            <div class="space-y-3">
                                <div>
                                    <label class="font-medium text-gray-700 dark:text-gray-300 text-sm">Company Name</label>
                                    <input type="text" class="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white" placeholder="Enter company name">
                                </div>
                                <div>
                                    <label class="font-medium text-gray-700 dark:text-gray-300 text-sm">Registration Number</label>
                                    <input type="text" class="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white" placeholder="Enter registration number">
                                </div>
                                <div>
                                    <label class="font-medium text-gray-700 dark:text-gray-300 text-sm">Industry</label>
                                    <input type="text" class="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white" placeholder="Enter industry">
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Add event listener to remove button
                    companyInfoSection.querySelector('.remove-section').addEventListener('click', function() {
                        const sectionToRemove = document.getElementById(this.dataset.section);
                        sectionToRemove.classList.add('hidden');
                        sectionToRemove.innerHTML = '';
                    });
                }
            });
            
            // Add client info
            addClientInfoBtn.addEventListener('click', () => {
                if (clientInfoSection.classList.contains('hidden')) {
                    clientInfoSection.classList.remove('hidden');
                    clientInfoSection.innerHTML = `
                        <div class="border border-accent rounded p-4 form-animation bg-white dark:bg-gray-700">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-semibold text-gray-700 dark:text-gray-300">Client Information</h3>
                                <button class="text-red-500 text-sm hover:text-red-700 remove-section" data-section="clientInfoSection">&times;</button>
                            </div>
                            <div class="space-y-3">
                                <div>
                                    <label class="font-medium text-gray-700 dark:text-gray-300 text-sm">Client Type</label>
                                    <select class="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white">
                                        <option>Individual</option>
                                        <option>Business</option>
                                        <option>Organization</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="font-medium text-gray-700 dark:text-gray-300 text-sm">Industry</label>
                                    <input type="text" class="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white" placeholder="Enter client industry">
                                </div>
                                <div>
                                    <label class="font-medium text-gray-700 dark:text-gray-300 text-sm">Client Since</label>
                                    <input type="date" class="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white">
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Add event listener to remove button
                    clientInfoSection.querySelector('.remove-section').addEventListener('click', function() {
                        const sectionToRemove = document.getElementById(this.dataset.section);
                        sectionToRemove.classList.add('hidden');
                        sectionToRemove.innerHTML = '';
                    });
                }
            });
            
            // Add description
            addDescriptionBtn.addEventListener('click', () => {
                if (descriptionSection.classList.contains('hidden')) {
                    descriptionSection.classList.remove('hidden');
                    descriptionSection.innerHTML = `
                        <div class="border border-accent rounded p-4 form-animation bg-white dark:bg-gray-700">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-semibold text-gray-700 dark:text-gray-300">Description</h3>
                                <button class="text-red-500 text-sm hover:text-red-700 remove-section" data-section="descriptionSection">&times;</button>
                            </div>
                            <div>
                                <label class="font-medium text-gray-700 dark:text-gray-300 text-sm">Project/Service Description</label>
                                <textarea class="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white" rows="3" placeholder="Enter detailed description"></textarea>
                            </div>
                        </div>
                    `;
                    
                    // Add event listener to remove button
                    descriptionSection.querySelector('.remove-section').addEventListener('click', function() {
                        const sectionToRemove = document.getElementById(this.dataset.section);
                        sectionToRemove.classList.add('hidden');
                        sectionToRemove.innerHTML = '';
                    });
                }
            });
            
            // Add payment
            addPaymentBtn.addEventListener('click', () => {
                if (paymentSection.classList.contains('hidden')) {
                    paymentSection.classList.remove('hidden');
                    paymentSection.innerHTML = `
                        <div class="border border-accent rounded p-4 form-animation bg-white dark:bg-gray-700">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-semibold text-gray-700 dark:text-gray-300">Payment Methods</h3>
                                <button class="text-red-500 text-sm hover:text-red-700 remove-section" data-section="paymentSection">&times;</button>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <input type="checkbox" id="jazzCash" class="mr-2">
                                    <label for="jazzCash" class="text-sm text-gray-700 dark:text-gray-300">JazzCash</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="checkbox" id="easyPaisa" class="mr-2">
                                    <label for="easyPaisa" class="text-sm text-gray-700 dark:text-gray-300">Easy Paisa</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="checkbox" id="payoneer" class="mr-2">
                                    <label for="payoneer" class="text-sm text-gray-700 dark:text-gray-300">Payoneer</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="checkbox" id="bankTransfer" class="mr-2">
                                    <label for="bankTransfer" class="text-sm text-gray-700 dark:text-gray-300">Bank Transfer</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="checkbox" id="cash" class="mr-2">
                                    <label for="cash" class="text-sm text-gray-700 dark:text-gray-300">Cash</label>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Add event listener to remove button
                    paymentSection.querySelector('.remove-section').addEventListener('click', function() {
                        const sectionToRemove = document.getElementById(this.dataset.section);
                        sectionToRemove.classList.add('hidden');
                        sectionToRemove.innerHTML = '';
                    });
                }
            });
            
            // Delete invoice
            deleteInvoiceBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this invoice? All data will be lost.')) {
                    // Reset all fields
                    document.getElementById('invoiceNumber').value = '0001';
                    document.getElementById('issueDate').value = '';
                    document.getElementById('dueDate').value = '';
                    document.getElementById('invoiceTerms').value = '';
                    
                    // Reset sender/receiver
                    senderName.textContent = 'Sender name';
                    senderDetails.textContent = 'Sender contact details';
                    receiverName.textContent = 'Recipient name';
                    receiverDetails.textContent = 'Recipient contact details';
                    
                    // Reset logo
                    logoPreview.classList.add('hidden');
                    logoText.textContent = 'Choose logo or drop it here';
                    logoInput.value = '';
                    
                    // Clear table
                    tableBody.innerHTML = '';
                    
                    // Reset totals
                    updateTotals();
                    
                    // Hide all additional sections
                    companyInfoSection.classList.add('hidden');
                    companyInfoSection.innerHTML = '';
                    clientInfoSection.classList.add('hidden');
                    clientInfoSection.innerHTML = '';
                    descriptionSection.classList.add('hidden');
                    descriptionSection.innerHTML = '';
                    paymentSection.classList.add('hidden');
                    paymentSection.innerHTML = '';
                    customFieldsSection.innerHTML = '';
                    
                    alert('Invoice deleted successfully!');
                }
            });
            
            // Download PDF
            downloadPdfBtn.addEventListener('click', () => {
                const element = document.getElementById('invoice-content');
                const opt = {
                    margin: 10,
                    filename: `invoice_${document.getElementById('invoiceNumber').value}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                html2pdf().set(opt).from(element).save();
            });
            
            saveInvoiceBtn.addEventListener('click', () => {
                const invoiceData = {
                    invoiceNumber: document.getElementById('invoiceNumber').value,
                    issueDate: document.getElementById('issueDate').value,
                    dueDate: document.getElementById('dueDate').value,
                    sender: {
                        name: document.getElementById('senderName').textContent,
                        details: document.getElementById('senderDetails').textContent
                    },
                    receiver: {
                        name: document.getElementById('receiverName').textContent,
                        details: document.getElementById('receiverDetails').textContent
                    },
                    items: Array.from(tableBody.querySelectorAll('tr')).map(row => ({
                        item: row.querySelector('input[type="text"]')?.value || '',
                        qty: row.querySelector('.qty')?.value || '0',
                        price: row.querySelector('.price')?.value || '0',
                        total: row.querySelector('.total')?.textContent || '$0.00'
                    })),
                    subtotal: subtotalEl.textContent,
                    tax: taxEl.textContent,
                    total: totalEl.textContent,
                    currency: currencySelect.value,
                    terms: document.getElementById('invoiceTerms').value
                };
                
                const allInvoices = JSON.parse(localStorage.getItem('allInvoices') || '[]');
                allInvoices.push(invoiceData);
                localStorage.setItem('allInvoices', JSON.stringify(allInvoices));
                
                alert('Invoice saved successfully!');
                showDashboard();
            });
            
            // Load saved invoice if exists
            const savedInvoice = localStorage.getItem('invoiceData');
            if (savedInvoice) {
                const invoiceData = JSON.parse(savedInvoice);
                document.getElementById('invoiceNumber').value = invoiceData.invoiceNumber;
                document.getElementById('issueDate').value = invoiceData.issueDate;
                document.getElementById('dueDate').value = invoiceData.dueDate;
                senderName.textContent = invoiceData.sender.name;
                senderDetails.textContent = invoiceData.sender.details;
                receiverName.textContent = invoiceData.receiver.name;
                receiverDetails.textContent = invoiceData.receiver.details;
                document.getElementById('invoiceTerms').value = invoiceData.terms;
                currencySelect.value = invoiceData.currency;
                
                // Recreate items
                invoiceData.items.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="p-2 border-b dark:border-gray-600"><input type="text" value="${item.item}" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm"></td>
                        <td class="p-2 border-b dark:border-gray-600 text-right"><input type="number" value="${item.qty}" class="w-16 text-right border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm qty"></td>
                        <td class="p-2 border-b dark:border-gray-600 text-right"><input type="number" value="${item.price}" class="w-20 text-right border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm price"></td>
                        <td class="p-2 border-b dark:border-gray-600 text-right total">${item.total}</td>
                        <td class="p-2 border-b dark:border-gray-600 text-center"><button class="text-red-500 hover:text-red-700 remove">&times;</button></td>`;
                    tableBody.appendChild(row);
                });
                
                updateTotals();
            }

            // Invoice Table Functionality
            addItemBtn.addEventListener('click', function() {
                addNewItem();
            });
            
            function addNewItem() {
                const newRow = tableBody.insertRow();
                newRow.classList.add('form-animation');
                newRow.innerHTML = `
                    <td class="p-2 border-b dark:border-gray-600">
                        <input type="text" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm focus:ring-1 focus:ring-accent" placeholder="Item description">
                    </td>
                    <td class="p-2 border-b dark:border-gray-600">
                        <input type="number" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white text-right rounded px-2 py-1 text-sm focus:ring-1 focus:ring-accent qty" value="1" min="0">
                    </td>
                    <td class="p-2 border-b dark:border-gray-600">
                        <input type="number" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white text-right rounded px-2 py-1 text-sm focus:ring-1 focus:ring-accent price" value="0.00" min="0" step="0.01">
                    </td>
                    <td class="p-2 border-b dark:border-gray-600 text-right total">${formatCurrency(0)}</td>
                    <td class="p-2 border-b dark:border-gray-600 text-center">
                        <button class="text-red-500 hover:text-red-700 transition-colors remove">&times;</button>
                    </td>
                `;
                
                // Add event listeners for the new inputs
                const inputs = newRow.querySelectorAll('input');
                inputs.forEach(input => {
                    input.addEventListener('input', updateTotals);
                });
                
                // Add event listener for delete button
                newRow.querySelector('button').addEventListener('click', function() {
                    newRow.style.opacity = '0';
                    newRow.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        newRow.remove();
                        updateTotals();
                    }, 200);
                });
                
                updateTotals();
            }
            
            function updateTotals() {
                let subtotal = 0;
                const rows = tableBody.querySelectorAll('tr');
                
                rows.forEach(row => {
                    const qtyInput = row.querySelector('.qty');
                    const priceInput = row.querySelector('.price');
                    const totalCell = row.querySelector('.total');
                    
                    if (qtyInput && priceInput) {
                        const qty = parseFloat(qtyInput.value) || 0;
                        const price = parseFloat(priceInput.value) || 0;
                        const total = qty * price;
                        
                        totalCell.textContent = formatCurrency(total);
                        subtotal += total;
                    }
                });
                
                const tax = subtotal * 0.05;
                subtotalEl.textContent = formatCurrency(subtotal);
                taxEl.textContent = formatCurrency(tax);
                totalEl.textContent = formatCurrency(subtotal + tax);
            }

            // Custom Field functionality
            addCustomFieldBtn.onclick = () => {
                customFieldModal.classList.remove('hidden');
            };
            
            closeCustomModal.onclick = cancelCustomBtn.onclick = () => {
                customFieldModal.classList.add('hidden');
                customFieldForm.reset();
            };
            
            // Update field value input based on field type
            fieldType.addEventListener('change', () => {
                updateFieldValueInput();
            });
            
            function updateFieldValueInput() {
                const type = fieldType.value;
                let html = '';
                
                if (type === 'textarea') {
                    html = `
                        <label class="font-medium text-gray-700 dark:text-gray-300 text-xs">Field Value</label>
                        <textarea id="fieldValue" class="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md w-full px-2 py-1.5 mt-1 focus:ring-1 focus:ring-accent text-sm transition-all" rows="3" placeholder="Enter field value"></textarea>
                    `;
                } else {
                    const inputType = type === 'date' ? 'date' : type === 'number' ? 'number' : 'text';
                    html = `
                        <label class="font-medium text-gray-700 dark:text-gray-300 text-xs">Field Value</label>
                        <input id="fieldValue" type="${inputType}" class="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md w-full px-2 py-1.5 mt-1 focus:ring-1 focus:ring-accent text-sm transition-all" placeholder="Enter field value">
                    `;
                }
                
                fieldValueContainer.innerHTML = html;
            }
            
            // Initialize field value input
            updateFieldValueInput();
            
            // Save custom field with animation
            saveCustomBtn.onclick = () => {
                const fieldName = document.getElementById('fieldName').value.trim();
                const fieldTypeValue = fieldType.value;
                const fieldValue = document.getElementById('fieldValue').value;
                
                if (!fieldName) {
                    alert('Please enter a field name');
                    return;
                }
                
                customFieldCount++;
                const fieldId = `customField_${customFieldCount}`;
                
                const fieldElement = document.createElement('div');
                fieldElement.className = 'border border-accent rounded p-4 mb-3 form-animation bg-white dark:bg-gray-700';
                fieldElement.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-semibold text-gray-700 dark:text-gray-300 text-sm">${fieldName}</h3>
                        <button class="text-red-500 text-sm hover:text-red-700 remove-custom-field" data-id="${fieldId}">&times;</button>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 text-sm">${fieldValue || 'No value set'}</p>
                `;
                
                customFieldsSection.appendChild(fieldElement);
                
                // Add event listener to remove button with animation
                fieldElement.querySelector('.remove-custom-field').addEventListener('click', function() {
                    const fieldToRemove = this.closest('.border');
                    fieldToRemove.style.opacity = '0';
                    fieldToRemove.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        fieldToRemove.remove();
                    }, 200);
                });
                
                customFieldModal.classList.add('hidden');
                customFieldForm.reset();
                updateFieldValueInput(); // Reset to default input type
            };

            // Add initial item
            addNewItem();
        }