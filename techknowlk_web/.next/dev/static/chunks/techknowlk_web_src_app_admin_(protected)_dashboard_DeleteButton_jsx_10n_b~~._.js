(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/techknowlk_web/src/app/admin/(protected)/dashboard/DeleteButton.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeleteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DeleteButton({ id, title }) {
    _s();
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(DeleteButton, "yoMZFUxxsJI/9DNHfV6cCpD0v08=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DeleteButton;
var _c;
__turbopack_context__.k.register(_c, "DeleteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=techknowlk_web_src_app_admin_%28protected%29_dashboard_DeleteButton_jsx_10n_b~~._.js.map