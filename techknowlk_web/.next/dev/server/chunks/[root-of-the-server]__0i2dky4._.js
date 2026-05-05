module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/techknowlk_web/src/lib/prisma.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/techknowlk_web/node_modules/@prisma/client)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        'query'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/techknowlk_web/src/app/api/client-projects/[id]/updates/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/src/lib/prisma.js [app-route] (ecmascript)");
;
;
async function POST(req, { params }) {
    try {
        const { id } = await params;
        const clientProjectId = parseInt(id);
        const data = await req.json();
        const additionalCost = parseFloat(data.additionalCost) || 0;
        // Use a transaction to ensure both the update is created and the main project is updated safely
        const [newUpdate, updatedProject] = await __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction([
            __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projectUpdate.create({
                data: {
                    clientProjectId: clientProjectId,
                    title: data.title,
                    description: data.description,
                    additionalCost: additionalCost
                }
            }),
            // Only increment actualCost if there's an additional cost
            ...additionalCost > 0 ? [
                __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].clientProject.update({
                    where: {
                        id: clientProjectId
                    },
                    data: {
                        actualCost: {
                            increment: additionalCost
                        }
                    }
                })
            ] : []
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            update: newUpdate,
            project: updatedProject || null
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating project update:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create project update'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0i2dky4._.js.map