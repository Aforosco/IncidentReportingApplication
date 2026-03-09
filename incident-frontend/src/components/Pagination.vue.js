import { computed, defineProps, defineEmits } from 'vue';
const props = defineProps();
const emit = defineEmits();
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
const startItem = computed(() => (props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.itemsPerPage + 1));
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems));
const goToPrevious = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
    }
};
const goToNext = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1);
    }
};
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        emit('update:currentPage', page);
    }
};
// Compute visible pages (max 5 shown)
const visiblePages = computed(() => {
    const pages = [];
    const total = totalPages.value;
    const current = props.currentPage;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    if (end - start < 4)
        start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++)
        pages.push(i);
    return pages;
});
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
    ...{ class: "flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex flex-1 justify-between sm:hidden" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.goToPrevious) },
    disabled: (__VLS_ctx.currentPage === 1),
    ...{ class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" },
});
// @ts-ignore
[goToPrevious, currentPage,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.goToNext) },
    disabled: (__VLS_ctx.currentPage === __VLS_ctx.totalPages),
    ...{ class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" },
});
// @ts-ignore
[currentPage, goToNext, totalPages,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-sm text-gray-700" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-medium" },
});
(__VLS_ctx.startItem);
// @ts-ignore
[startItem,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-medium" },
});
(__VLS_ctx.endItem);
// @ts-ignore
[endItem,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-medium" },
});
(__VLS_ctx.totalItems);
// @ts-ignore
[totalItems,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "isolate inline-flex -space-x-px rounded-md shadow-sm" },
    'aria-label': "Pagination",
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.goToPrevious) },
    disabled: (__VLS_ctx.currentPage === 1),
    ...{ class: "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed" },
});
// @ts-ignore
[goToPrevious, currentPage,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "sr-only" },
});
__VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
    ...{ class: "h-5 w-5" },
    viewBox: "0 0 20 20",
    fill: "currentColor",
});
__VLS_asFunctionalElement(__VLS_elements.path)({
    'fill-rule': "evenodd",
    d: "M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z",
    'clip-rule': "evenodd",
});
for (const [page] of __VLS_getVForSourceType((__VLS_ctx.visiblePages))) {
    // @ts-ignore
    [visiblePages,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.goToPage(page);
                // @ts-ignore
                [goToPage,];
            } },
        key: (page),
        ...{ class: ([
                page === __VLS_ctx.currentPage
                    ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20'
            ]) },
    });
    // @ts-ignore
    [currentPage,];
    (page);
}
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.goToNext) },
    disabled: (__VLS_ctx.currentPage === __VLS_ctx.totalPages),
    ...{ class: "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed" },
});
// @ts-ignore
[currentPage, goToNext, totalPages,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "sr-only" },
});
__VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
    ...{ class: "h-5 w-5" },
    viewBox: "0 0 20 20",
    fill: "currentColor",
});
__VLS_asFunctionalElement(__VLS_elements.path)({
    'fill-rule': "evenodd",
    d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
    'clip-rule': "evenodd",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['isolate']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['-space-x-px']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-l-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-inset']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-r-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-inset']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
