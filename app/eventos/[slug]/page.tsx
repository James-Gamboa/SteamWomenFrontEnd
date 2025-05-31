import { EventsDetailTemplate } from "@/components/templates/events-detail-template";
export default function EventDetailPage(props: any) {
  return <EventsDetailTemplate slug={props.params.slug} />;
}
