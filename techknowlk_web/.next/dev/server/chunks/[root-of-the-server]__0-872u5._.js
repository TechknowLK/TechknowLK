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
"[project]/techknowlk_web/src/app/api/client-projects/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/techknowlk_web/src/lib/prisma.js [app-route] (ecmascript)");
;
;
async function GET(req, { params }) {
    try {
        const { id } = await params;
        const project = await __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].clientProject.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                updates: {
                    orderBy: {
                        date: 'desc'
                    }
                }
            }
        });
        if (!project) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Project not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(project);
    } catch (error) {
        console.error('Error fetching client project:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch client project'
        }, {
            status: 500
        });
    }
}
async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const data = await req.json();
        const project = await __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].clientProject.update({
            where: {
                id: parseInt(id)
            },
            data: {
                projectId: data.projectId,
                projectName: data.projectName,
                clientName: data.clientName,
                clientContact: data.clientContact,
                category: data.category,
                projectManager: data.projectManager,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                status: data.status,
                estimatedBudget: parseFloat(data.estimatedBudget) || 0,
                actualCost: parseFloat(data.actualCost) || 0,
                paymentStatus: data.paymentStatus,
                overallProgress: parseInt(data.overallProgress) || 0
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(project);
    } catch (error) {
        console.error('Error updating client project:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update client project'
        }, {
            status: 500
        });
    }
}
async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        await __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].clientProject.delete({
            where: {
                id: parseInt(id)
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting client project:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$techknowlk_web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete client project'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0-872u5._.js.map