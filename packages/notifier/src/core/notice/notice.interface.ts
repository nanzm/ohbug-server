import type {
  NotificationSetting,
  OhbugEventLike,
  Issue,
  NotificationRule,
} from '@ohbug-server/types'

export interface DispatchNotice {
  setting: NotificationSetting
  rule: NotificationRule
  issue: Issue
  event: OhbugEventLike
}

export interface SendEmail {
  email: string
  title: string
  text: string
  html: string
}
