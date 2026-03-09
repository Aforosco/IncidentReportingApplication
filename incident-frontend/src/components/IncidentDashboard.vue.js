import { ref, onMounted } from 'vue';
import { getAllIncidents, deleteIncident } from '../services/incidentService';
import IncidentModal from './IncidentModal.vue';
import { useRouter } from "vue-router";
const router = useRouter();
const handleLogout = () => {
    // Remove the JWT token
    localStorage.removeItem("token");
    // Redirect to login page
    router.push("/login");
};
const incidents = ref([]);
const showCreate = ref(false);
const editingIncident = ref(null);
const fetchIncidents = async () => {
    const res = await getAllIncidents();
    incidents.value = res;
};
const editIncident = (incident) => {
    editingIncident.value = incident;
};
const deleteIncidentHandler = async (id) => {
    if (confirm('Are you sure?')) {
        await deleteIncident(id);
        fetchIncidents();
    }
};
onMounted(fetchIncidents);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "p-4 max-w-6xl mx-auto" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold mb-6 text-center" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-6" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-between items-center" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-xl font-bold text-gray-800" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.handleLogout) },
    ...{ class: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow transition" },
});
// @ts-ignore
[handleLogout,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-6" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showCreate = true;
            // @ts-ignore
            [showCreate,];
        } },
    ...{ class: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "min-w-full bg-white border rounded shadow overflow-hidden" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({
    ...{ class: "bg-gray-100" },
});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "py-2 px-4 text-left" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "py-2 px-4 text-left" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "py-2 px-4 text-left" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "py-2 px-4 text-left" },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "py-2 px-4 text-left" },
});
__VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
for (const [incident] of __VLS_getVForSourceType((__VLS_ctx.incidents))) {
    // @ts-ignore
    [incidents,];
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
        key: (incident.id),
        ...{ class: "border-t hover:bg-gray-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "py-2 px-4" },
    });
    (incident.id);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "py-2 px-4" },
    });
    (incident.title);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "py-2 px-4" },
    });
    (incident.status);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "py-2 px-4" },
    });
    (incident.severity);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "py-2 px-4 space-x-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.editIncident(incident);
                // @ts-ignore
                [editIncident,];
            } },
        ...{ class: "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.deleteIncidentHandler(incident.id);
                // @ts-ignore
                [deleteIncidentHandler,];
            } },
        ...{ class: "bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" },
    });
}
if (__VLS_ctx.showCreate) {
    // @ts-ignore
    [showCreate,];
    /** @type {[typeof IncidentModal, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(IncidentModal, new IncidentModal({
        ...{ 'onClose': {} },
        ...{ 'onSaved': {} },
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClose': {} },
        ...{ 'onSaved': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ close: {} },
        { onClose: (...[$event]) => {
                if (!(__VLS_ctx.showCreate))
                    return;
                __VLS_ctx.showCreate = false;
                // @ts-ignore
                [showCreate,];
            } });
    const __VLS_6 = ({ saved: {} },
        { onSaved: (__VLS_ctx.fetchIncidents) });
    // @ts-ignore
    [fetchIncidents,];
    var __VLS_2;
}
if (__VLS_ctx.editingIncident) {
    // @ts-ignore
    [editingIncident,];
    /** @type {[typeof IncidentModal, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(IncidentModal, new IncidentModal({
        ...{ 'onClose': {} },
        ...{ 'onSaved': {} },
        incident: (__VLS_ctx.editingIncident),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClose': {} },
        ...{ 'onSaved': {} },
        incident: (__VLS_ctx.editingIncident),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = ({ close: {} },
        { onClose: (...[$event]) => {
                if (!(__VLS_ctx.editingIncident))
                    return;
                __VLS_ctx.editingIncident = null;
                // @ts-ignore
                [editingIncident, editingIncident,];
            } });
    const __VLS_14 = ({ saved: {} },
        { onSaved: (__VLS_ctx.fetchIncidents) });
    // @ts-ignore
    [fetchIncidents,];
    var __VLS_10;
}
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-yellow-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-yellow-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-700']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
