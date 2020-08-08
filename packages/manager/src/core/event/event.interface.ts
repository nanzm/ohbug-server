import type {
  UncaughtErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  ResourceErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail,
} from '@ohbug/browser';
import type { ReactErrorDetail } from '@ohbug/react';
import type { VueErrorDetail } from '@ohbug/vue';

export type OhbugEventDetail = UncaughtErrorDetail &
  UnhandledrejectionErrorDetail &
  UnknownErrorDetail &
  ResourceErrorDetail &
  AjaxErrorDetail &
  FetchErrorDetail &
  WebsocketErrorDetail &
  ReactErrorDetail &
  VueErrorDetail;

export interface OhbugDocument {
  document_id: string;
  index: string;
}

export interface MetaData {
  type: string;
  message: string;
  filename?: string;
  others?: string;
}
export interface AggregationDataAndMetaData {
  agg: any[];
  metadata: MetaData;
}

export interface GetEventByEventId {
  event_id: string;
  issue_id: string | number;
}
