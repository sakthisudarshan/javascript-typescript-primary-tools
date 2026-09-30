/**
 * Account Service containing duplicated logic for auditing account profiles.
 * Duplicates formatAndAuditUserProfile from user_service.js intentionally.
 */

function formatAndAuditAccountProfile(account, auditLog, timestamp) {
    if (!account || typeof account !== 'object') {
        throw new Error('Invalid user payload provided to audit engine');
    }

    const sanitizedName = account.name ? account.name.trim().toLowerCase() : 'anonymous';
    const sanitizedEmail = account.email ? account.email.trim().toLowerCase() : 'no-email@domain.com';
    const roleLevel = account.role === 'admin' ? 10 : account.role === 'moderator' ? 5 : 1;
    const accessFlags = [];

    if (account.isActive) {
        accessFlags.push('LOGIN_ALLOWED');
        if (account.isMfaEnabled) {
            accessFlags.push('HIGH_SECURITY_ACCESS');
        }
    } else {
        accessFlags.push('ACCOUNT_SUSPENDED');
    }

    const auditEntry = {
        entityId: account.id || 'unknown-id',
        sanitizedName,
        sanitizedEmail,
        roleLevel,
        flags: accessFlags,
        recordedAt: timestamp || new Date().toISOString(),
        checksum: Buffer.from(`${sanitizedName}:${sanitizedEmail}:${roleLevel}`).toString('base64')
    };

    if (auditLog && Array.isArray(auditLog)) {
        auditLog.push(auditEntry);
    }

    return auditEntry;
}

module.exports = { formatAndAuditAccountProfile };
