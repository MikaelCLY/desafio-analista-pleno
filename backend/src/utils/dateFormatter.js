const DATE_TIME_FORMAT_OPTIONS = {
  timeZone: 'America/Sao_Paulo',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}

function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat('pt-BR', DATE_TIME_FORMAT_OPTIONS).format(new Date(timestamp))
}

function formatGeneratedAt(date = new Date()) {
  return formatDateTime(date).replace(',', ' às')
}

module.exports = { formatDateTime, formatGeneratedAt }
