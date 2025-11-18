// --- Configuration Data ---
const PRICE_CATEGORIES = [
    {label: 'Basic/Lite', multiplier: 3, description: '3 millas por USD'},
    {label: 'Classic', multiplier: 6, description: '6 millas por USD'},
    {label: 'Flex', multiplier: 8, description: '8 millas por USD'},
    {label: 'Business', multiplier: 10, description: '10 millas por USD'},
];

const ELITE_STATUSES = [
    {label: 'Ninguno', bonus: 0, description: '0% bonus'},
    {label: 'Red Plus', bonus: 0.10, description: '10% bonus'},
    {label: 'Silver', bonus: 0.20, description: '20% bonus'},
    {label: 'Gold', bonus: 0.60, description: '60% bonus'},
    {label: 'Diamond', bonus: 0.80, description: '80% bonus'},
];

// --- Utility Functions ---
const formatNumber = (num) => {
    if (isNaN(num) || num === null) return '0';
    // Use Math.round() for display per previous versions
    return Math.round(num).toLocaleString('es-AR');
};

// --- Core Calculation Function ---
function calculateMiles() {
    // 1. Get Input Values and selected configurations
    const basePriceInput = $('#basePrice').val().replace(/[^0-9.]/g, '');
    const price = parseFloat(basePriceInput) || 0;
    const fareClassIndex = parseInt($('#fareClass').val());
    const eliteStatusIndex = parseInt($('#eliteStatus').val());

    const selectedCategory = PRICE_CATEGORIES[fareClassIndex];
    const selectedStatus = ELITE_STATUSES[eliteStatusIndex];

    const multiplier = selectedCategory.multiplier;
    const bonusRate = selectedStatus.bonus;

    // --- Calculation Logic ---

    // 1. Calculate Base Miles
    const baseMiles = price * multiplier;

    // 2. Calculate Elite Bonus Miles (Redeemable only)
    const eliteBonusMiles = baseMiles * bonusRate;

    // 3. Calculate Total Redeemable Miles (RM)
    // RM = Base Miles (RM) + Elite Bonus Miles (1:1)
    const totalMiles = baseMiles + eliteBonusMiles;

    // 4. Calculate Qualifying Miles (QM)
    // QM = Base Miles (QM) + round(Elite Bonus Miles / 20)
    const qualifyingMilesFromBonus = Math.round(eliteBonusMiles / 20);
    const qualifyingMiles = baseMiles + qualifyingMilesFromBonus;

    // --- Update UI ---

    // Update main result cards
    $('#totalMilesValue').val(formatNumber(totalMiles));
    $('#qualifyingMilesValue').val(formatNumber(qualifyingMiles));
}

// --- Initialization on Document Ready ---
$(document).ready(function () {
    // Populate Fare Class dropdown
    const fareClassSelect = $('#fareClass');
    PRICE_CATEGORIES.forEach((category, index) => {
        fareClassSelect.append(
            $('<option>', {
                value: index,
                text: `${category.label} (${category.description})`
            })
        );
    });
    // Set default value
    fareClassSelect.val(1);


    // Populate Elite Status dropdown
    const eliteStatusSelect = $('#eliteStatus');
    ELITE_STATUSES.forEach((status, index) => {
        eliteStatusSelect.append(
            $('<option>', {
                value: index,
                text: `${status.label} (${status.description})`
            })
        );
    });
    // Set default value
    eliteStatusSelect.val(3);


    // Attach event listeners for calculations
    $('#basePrice, #fareClass, #eliteStatus').on('keyup change', calculateMiles);

    // Run initial calculation
    calculateMiles();
});
