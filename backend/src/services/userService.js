/**
 * User Service containing business logic for formatting and auditing profile data.
 */

function formatAndAuditUserProfile(user, auditLog, timestamp) {
    if (!user || typeof user !== 'object') {
        throw new Error('Invalid user payload provided to audit engine');
    }

    const sanitizedName = user.name ? user.name.trim().toLowerCase() : 'anonymous';
    const sanitizedEmail = user.email ? user.email.trim().toLowerCase() : 'no-email@domain.com';
    const roleLevel = user.role === 'admin' ? 10 : user.role === 'moderator' ? 5 : 1;
    const accessFlags = [];

    if (user.isActive) {
        accessFlags.push('LOGIN_ALLOWED');
        if (user.isMfaEnabled) {
            accessFlags.push('HIGH_SECURITY_ACCESS');
        }
    } else {
        accessFlags.push('ACCOUNT_SUSPENDED');
    }

    const auditEntry = {
        entityId: user.id || 'unknown-id',
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

module.exports = { formatAndAuditUserProfile };
