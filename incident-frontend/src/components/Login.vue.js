import { ref } from "vue";
import { login } from "../services/login";
import { useRouter } from "vue-router";
const form = ref({ email: "", password: "" });
const error = ref("");
const router = useRouter();
const handleLogin = async () => {
    try {
        error.value = "";
        const response = await login(form.value.email, form.value.password);
        if (response.role === "Admin") {
            router.push("/admin-dashboard");
        }
        else {
            router.push("/user-dashboard");
        }
    }
    catch (err) {
        error.value = "Invalid credentials";
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-center h-screen bg-gray-100" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white shadow-lg rounded p-8 w-full max-w-sm" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-2xl font-bold mb-4 text-center" },
});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.handleLogin) },
    ...{ class: "space-y-4" },
});
// @ts-ignore
[handleLogin,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block mb-1 font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "email",
    ...{ class: "w-full border px-3 py-2 rounded" },
    required: true,
});
(__VLS_ctx.form.email);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block mb-1 font-medium" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "password",
    ...{ class: "w-full border px-3 py-2 rounded" },
    required: true,
});
(__VLS_ctx.form.password);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    ...{ class: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "mt-4 text-center text-sm text-gray-600" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/register",
    ...{ class: "text-blue-600 hover:underline" },
}));
const __VLS_2 = __VLS_1({
    to: "/register",
    ...{ class: "text-blue-600 hover:underline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-red-600 text-center mt-2" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
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
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
