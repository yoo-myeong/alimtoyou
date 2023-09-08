import { format, transports } from 'winston'
import WinstonDaily from 'winston-daily-rotate-file'
import path from 'path'
import { NodeEnv } from '../NodeEnv'

const logDir = 'logs'

function getTextFormat(moduleName: string) {
  return format.combine(
    format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    format.printf(
      ({ level, timestamp, message, label, ...meta }) =>
        // eslint-disable-next-line max-len
        `${timestamp} ${level} ${label} MESSAGE=${message}, TRACE_ID=${meta?.traceId}`,
    ),
  )
}

export function getWinstonTransports(nodeEnv: NodeEnv, moduleName: string) {
  const isLocalEnv = [NodeEnv.LOCAL, NodeEnv.TEST].includes(nodeEnv)
  const level = isLocalEnv ? 'debug' : 'info'

  const extraTransports = []
  if (isLocalEnv)
    extraTransports.push(
      new transports.Console({
        level,
        format: getTextFormat(moduleName),
      }),
    )

  return [
    ...extraTransports,
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(__dirname, logDir, '/all-level'),
      filename: '%DATE%.all-level.log',
      maxFiles: 365,
      format: getTextFormat(moduleName),
      zippedArchive: true,
    }),
  ]
}
