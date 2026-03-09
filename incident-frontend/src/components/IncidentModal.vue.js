import { ref, watch } from 'vue';
import { createIncident, updateIncident } from '../services/incidentService';
const props = defineProps();
const emit = defineEmits();
const form = ref({
    title: '',
    description: '',
    severity: 'Low',
    status: 'New',
    assignedTo: '',
});
watch(() => props.incident, (incident) => {
    if (incident) {
        form.value = {
            title: incident.title,
            description: incident.description,
            severity: incident.severity,
            status: incident.status,
            assignedTo: incident.assignedTo || '',
        };
    }
}, { immediate: true });
const saveIncident = async () => {
    if (props.incident) {
        await updateIncident(props.incident.id, form.value);
    }
    else {
        await createIncident(form.value);
    }
    emit('saved');
    emit('close');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white rounded shadow-lg w-full max-w-md p-6 relative" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-2xl font-bold mb-4" },
});
(__VLS_ctx.incident ? 'Edit Incident' : 'Create Incident');
// @ts-ignore
[incident,];
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.saveIncident) },
    ...{ class: "space-y-4" },
});
// @ts-ignore
[saveIncident,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block mb-1 font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "w-full border px-3 py-2 rounded" },
    required: true,
});
(__VLS_ctx.form.title);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block mb-1 font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
    value: (__VLS_ctx.form.description),
    ...{ class: "w-full border px-3 py-2 rounded" },
    required: true,
});
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid grid-cols-2 gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block mb-1 font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.form.severity),
    ...{ class: "w-full border px-3 py-2 rounded" },
});
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block mb-1 font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.form.status),
    ...{ class: "w-full border px-3 py-2 rounded" },
});
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block mb-1 font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "w-full border px-3 py-2 rounded" },
});
(__VLS_ctx.form.assignedTo);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end space-x-2 mt-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
            // @ts-ignore
            [$emit,];
        } },
    type: "button",
    ...{ class: "px-4 py-2 rounded border" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    ...{ class: "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" },
});
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
