import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { logout } from "../services/login";
import Pagination from "../components/Pagination.vue";
import { getAllIncidents, updateIncident } from "../services/incidentService";
import * as XLSX from "xlsx";
const router = useRouter();
const incidents = ref([]);
const showEditModal = ref(false);
const isDownloading = ref(false);
const selectedIncident = ref({
    id: 0,
    title: "",
    description: "",
    status: "",
    severity: "",
    assignedTo: "",
    resolutionNotes: "",
    isEscalated: false,
    dueDate: null
});
const currentPage = ref(1);
const totalCount = ref(0);
const pageSize = ref(10);
const stats = computed(() => ({
    total: incidents.value.length,
    pending: incidents.value.filter(i => i.status === "Investigating").length,
    completed: incidents.value.filter(i => i.status === "Resolved").length,
}));
const loadIncidents = async () => {
    try {
        const response = await getAllIncidents(currentPage.value);
        incidents.value = response?.incidents || []; // Add fallback
        totalCount.value = response?.totalCount || 0;
        pageSize.value = response?.pageSize || 10;
    }
    catch (error) {
        console.error("Failed to load incidents:", error);
        incidents.value = []; // Ensure it's always an array even on error
        totalCount.value = 0;
    }
};
const downloadExcel = async () => {
    isDownloading.value = true;
    try {
        // Fetch all incidents (not just current page)
        const allIncidentsData = [];
        let page = 1;
        let hasMore = true;
        while (hasMore) {
            const response = await getAllIncidents(page);
            allIncidentsData.push(...response.incidents);
            // Check if there are more pages
            if (allIncidentsData.length >= response.totalCount) {
                hasMore = false;
            }
            else {
                page++;
            }
        }
        // Prepare data for Excel
        const excelData = allIncidentsData.map(incident => ({
            "ID": incident.id,
            "Incident Number": incident.incidentNumber || "N/A",
            "Title": incident.title,
            "Description": incident.description,
            "Status": incident.status,
            "Severity": incident.severity || "N/A",
            "Assigned To": incident.assignedTo || "Unassigned",
            "Created By": incident.createdBy,
            "Created At": new Date(incident.createdAt).toLocaleString(),
            "Updated At": incident.updatedAt ? new Date(incident.updatedAt).toLocaleString() : "N/A",
            "Due Date": incident.dueDate ? new Date(incident.dueDate).toLocaleDateString() : "N/A",
            "Resolution Notes": incident.resolutionNotes || "N/A",
            "Is Escalated": incident.isEscalated ? "Yes" : "No"
        }));
        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        // Set column widths for better readability
        ws['!cols'] = [
            { wch: 8 }, // ID
            { wch: 15 }, // Incident Number
            { wch: 30 }, // Title
            { wch: 40 }, // Description
            { wch: 15 }, // Status
            { wch: 12 }, // Severity
            { wch: 12 }, // Priority
            { wch: 25 }, // Assigned To
            { wch: 25 }, // Created By
            { wch: 20 }, // Created At
            { wch: 20 }, // Updated At
            { wch: 15 }, // Due Date
            { wch: 30 }, // Resolution Notes
            { wch: 12 } // Is Escalated
        ];
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Incidents");
        // Generate filename with current date
        const date = new Date().toISOString().split('T')[0];
        const filename = `Incidents_Report_${date}.xlsx`;
        // Download file
        XLSX.writeFile(wb, filename);
        alert(`Successfully downloaded ${allIncidentsData.length} incidents`);
    }
    catch (error) {
        console.error("Failed to download Excel:", error);
        alert("Failed to download Excel file. Please try again.");
    }
    finally {
        isDownloading.value = false;
    }
};
const handlePageChange = (page) => {
    currentPage.value = page;
};
watch(currentPage, loadIncidents);
const openEditModal = (incident) => {
    selectedIncident.value = { ...incident };
    showEditModal.value = true;
};
const saveIncident = async () => {
    if (!selectedIncident.value)
        return;
    try {
        // Admin can update all fields - MUST include id property for backend validation
        const updatePayload = {
            id: selectedIncident.value.id, // CRITICAL: Backend checks if id matches
            title: selectedIncident.value.title,
            description: selectedIncident.value.description,
            status: selectedIncident.value.status,
            severity: selectedIncident.value.severity,
            assignedTo: selectedIncident.value.assignedTo,
            resolutionNotes: selectedIncident.value.resolutionNotes,
            isEscalated: selectedIncident.value.isEscalated,
            dueDate: selectedIncident.value.dueDate
        };
        await updateIncident(selectedIncident.value.id, updatePayload);
        // Update local list
        const index = incidents.value.findIndex(i => i.id === selectedIncident.value.id);
        if (index !== -1) {
            incidents.value[index] = { ...incidents.value[index], ...selectedIncident.value };
        }
        showEditModal.value = false;
    }
    catch (error) {
        console.error("Failed to update incident:", error);
        alert("Failed to update incident. Please try again.");
    }
};
const getStatusClass = (status) => {
    switch (status) {
        case "Pending":
            return "bg-yellow-100 text-yellow-800";
        case "In Progress":
            return "bg-blue-100 text-blue-800";
        case "Completed":
            return "bg-green-100 text-green-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};
const handleLogout = () => {
    logout();
    router.push("/login");
};
onMounted(() => {
    loadIncidents();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "min-h-screen bg-gray-100" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "bg-white shadow" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "max-w-7xl mx-auto px-4 py-4 flex justify-between items-center" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-bold text-gray-900" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex space-x-3" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.downloadExcel) },
    disabled: (__VLS_ctx.isDownloading),
    ...{ class: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center" },
});
// @ts-ignore
[downloadExcel, isDownloading,];
if (!__VLS_ctx.isDownloading) {
    // @ts-ignore
    [isDownloading,];
    __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
        ...{ class: "w-5 h-5 mr-2" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    __VLS_asFunctionalElement(__VLS_elements.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    });
}
if (__VLS_ctx.isDownloading) {
    // @ts-ignore
    [isDownloading,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.handleLogout) },
    ...{ class: "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" },
});
// @ts-ignore
[handleLogout,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "max-w-7xl mx-auto px-4 py-6" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white p-6 rounded-lg shadow" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-gray-500 text-sm font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-3xl font-bold text-gray-900" },
});
(__VLS_ctx.stats.total);
// @ts-ignore
[stats,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white p-6 rounded-lg shadow" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-gray-500 text-sm font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-3xl font-bold text-yellow-600" },
});
(__VLS_ctx.stats.pending);
// @ts-ignore
[stats,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white p-6 rounded-lg shadow" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-gray-500 text-sm font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-3xl font-bold text-green-600" },
});
(__VLS_ctx.stats.completed);
// @ts-ignore
[stats,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white shadow rounded-lg overflow-hidden" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "px-6 py-4 border-b" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-xl font-semibold" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "overflow-x-auto" },
});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "min-w-full divide-y divide-gray-200" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({
    ...{ class: "bg-gray-50" },
});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" },
});
__VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({
    ...{ class: "bg-white divide-y divide-gray-200" },
});
for (const [incident] of __VLS_getVForSourceType((__VLS_ctx.incidents))) {
    // @ts-ignore
    [incidents,];
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
        key: (incident.id),
    });
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "px-6 py-4 text-sm text-gray-900" },
    });
    (incident.id);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "px-6 py-4 text-sm text-gray-900" },
    });
    (incident.title);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "px-6 py-4 text-sm text-gray-500" },
    });
    (incident.description);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "px-6 py-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: (__VLS_ctx.getStatusClass(incident.status)) },
        ...{ class: "px-2 py-1 text-xs rounded-full" },
    });
    // @ts-ignore
    [getStatusClass,];
    (incident.status);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "px-6 py-4 text-sm text-gray-500" },
    });
    (incident.createdBy);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "px-6 py-4 text-sm space-x-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.openEditModal(incident);
                // @ts-ignore
                [openEditModal,];
            } },
        ...{ class: "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-6" },
});
/** @type {[typeof Pagination, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Pagination, new Pagination({
    ...{ 'onUpdate:currentPage': {} },
    currentPage: (__VLS_ctx.currentPage),
    totalItems: (__VLS_ctx.totalCount),
    itemsPerPage: (__VLS_ctx.pageSize),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onUpdate:currentPage': {} },
    currentPage: (__VLS_ctx.currentPage),
    totalItems: (__VLS_ctx.totalCount),
    itemsPerPage: (__VLS_ctx.pageSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ 'update:currentPage': {} },
    { 'onUpdate:currentPage': (__VLS_ctx.handlePageChange) });
// @ts-ignore
[currentPage, totalCount, pageSize, handlePageChange,];
var __VLS_2;
if (__VLS_ctx.showEditModal) {
    // @ts-ignore
    [showEditModal,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-white rounded-lg p-6 w-full max-w-md shadow-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-lg font-semibold mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.saveIncident) },
    });
    // @ts-ignore
    [saveIncident,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        value: (__VLS_ctx.selectedIncident.title),
        type: "text",
        ...{ class: "w-full border border-gray-300 rounded px-3 py-2 bg-gray-100" },
        disabled: true,
    });
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-gray-500 mt-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
        value: (__VLS_ctx.selectedIncident.description),
        rows: "3",
        ...{ class: "w-full border border-gray-300 rounded px-3 py-2 bg-gray-100" },
        disabled: true,
    });
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-gray-500 mt-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
        value: (__VLS_ctx.selectedIncident.status),
        ...{ class: "w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200" },
    });
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "New",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "Pending",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "In Progress",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "Completed",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
        value: (__VLS_ctx.selectedIncident.severity),
        ...{ class: "w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200" },
        disabled: true,
    });
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "Low",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "Medium",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "High",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "Critical",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        value: (__VLS_ctx.selectedIncident.assignedTo),
        type: "text",
        ...{ class: "w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200" },
        placeholder: "Enter email address",
    });
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
        value: (__VLS_ctx.selectedIncident.resolutionNotes),
        rows: "3",
        ...{ class: "w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200" },
        placeholder: "Add resolution notes...",
    });
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "date",
        ...{ class: "w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200" },
    });
    (__VLS_ctx.selectedIncident.dueDate);
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "flex items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "checkbox",
        ...{ class: "mr-2" },
    });
    (__VLS_ctx.selectedIncident.isEscalated);
    // @ts-ignore
    [selectedIncident,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm font-medium text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-end space-x-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showEditModal))
                    return;
                __VLS_ctx.showEditModal = false;
                // @ts-ignore
                [showEditModal,];
            } },
        type: "button",
        ...{ class: "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        type: "submit",
        ...{ class: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" },
    });
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['divide-y']} */ ;
/** @type {__VLS_StyleScopedClasses['divide-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['divide-y']} */ ;
/** @type {__VLS_StyleScopedClasses['divide-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-200']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-200']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-200']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-200']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-200']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
