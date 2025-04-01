export const handleTwilioError = (error) => {
    const twilioErrors = {
        21211: 'Número inválido',
        21614: 'Número no móvil',
        21408: 'No tiene permisos'
    };

    return {
        code: error.code,
        message: twilioErrors[error.code] || error.message,
        originalError: error
    }
}