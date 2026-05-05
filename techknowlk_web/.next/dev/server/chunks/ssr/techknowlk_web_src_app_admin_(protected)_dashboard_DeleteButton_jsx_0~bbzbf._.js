module.exports = [
"[project]/techknowlk_web/src/app/admin/(protected)/dashboard/DeleteButton.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeleteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function DeleteButton({ id, title }) {
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleDelete = async ()=>{
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            alert('An error occurred');
        } finally{
            setIsDeleting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleDelete,
        disabled: isDeleting,
        className: "text-red-600 hover:text-red-900 mx-2 disabled:opacity-50",
        children: isDeleting ? 'Deleting...' : 'Delete'
    }, void 0, false, {
        fileName: "[project]/techknowlk_web/src/app/admin/(protected)/dashboard/DeleteButton.jsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=techknowlk_web_src_app_admin_%28protected%29_dashboard_DeleteButton_jsx_0~bbzbf._.js.map