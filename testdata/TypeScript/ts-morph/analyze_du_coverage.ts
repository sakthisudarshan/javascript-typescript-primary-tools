import { Project, SyntaxKind, Node } from 'ts-morph';
import * as path from 'path';

export interface DefinitionReport {
    variableName: string;
    line: number;
    hasUses: boolean;
    cUseCount: number;
    pUseCount: number;
    isDeadDefinition: boolean;
}

export interface DUCoverageSummary {
    totalDefinitions: number;
    coveredDefinitions: number;
    deadDefinitions: number;
    allDefsCoveragePercent: number;
    totalUses: number;
    cUses: number;
    pUses: number;
    definitions: DefinitionReport[];
}

export function analyzeDUPaths(filePath: string): DUCoverageSummary {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);

    const definitions: DefinitionReport[] = [];
    let totalUses = 0;
    let totalCUses = 0;
    let totalPUses = 0;

    const varDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration);

    for (const decl of varDeclarations) {
        const name = decl.getName();
        const line = decl.getStartLineNumber();
        const refs = decl.findReferencesAsNodes();
        
        // Filter out declaration itself from references
        const useNodes = refs.filter(ref => ref !== decl.getNameNode());

        let cUses = 0;
        let pUses = 0;

        for (const use of useNodes) {
            // Check if within predicate condition (if, while, for condition, ternary)
            const parentIf = use.getFirstAncestorByKind(SyntaxKind.IfStatement);
            const parentWhile = use.getFirstAncestorByKind(SyntaxKind.WhileStatement);
            const parentFor = use.getFirstAncestorByKind(SyntaxKind.ForStatement);
            const parentCond = use.getFirstAncestorByKind(SyntaxKind.ConditionalExpression);

            const isContained = (parentExpr: Node | undefined) => {
                if (!parentExpr) return false;
                return parentExpr.getPos() <= use.getPos() && use.getEnd() <= parentExpr.getEnd();
            };

            let isPredicate = false;
            if (parentIf && isContained(parentIf.getExpression())) isPredicate = true;
            if (parentWhile && isContained(parentWhile.getExpression())) isPredicate = true;
            if (parentFor && isContained(parentFor.getCondition())) isPredicate = true;
            if (parentCond && isContained(parentCond.getCondition())) isPredicate = true;

            if (isPredicate) {
                pUses++;
            } else {
                cUses++;
            }
        }

        const isDead = useNodes.length === 0;
        definitions.push({
            variableName: name,
            line,
            hasUses: useNodes.length > 0,
            cUseCount: cUses,
            pUseCount: pUses,
            isDeadDefinition: isDead
        });

        totalUses += useNodes.length;
        totalCUses += cUses;
        totalPUses += pUses;
    }

    const totalDefs = definitions.length;
    const coveredDefs = definitions.filter(d => !d.isDeadDefinition).length;
    const deadDefs = definitions.filter(d => d.isDeadDefinition).length;
    const allDefsPct = totalDefs > 0 ? (coveredDefs / totalDefs) * 100 : 100;

    return {
        totalDefinitions: totalDefs,
        coveredDefinitions: coveredDefs,
        deadDefinitions: deadDefs,
        allDefsCoveragePercent: Math.round(allDefsPct * 100) / 100,
        totalUses,
        cUses: totalCUses,
        pUses: totalPUses,
        definitions
    };
}

if (require.main === module) {
    const targetFile = process.argv[2] || path.join(__dirname, 'src/du_paths.ts');
    const summary = analyzeDUPaths(targetFile);
    console.log(JSON.stringify(summary, null, 2));
}
