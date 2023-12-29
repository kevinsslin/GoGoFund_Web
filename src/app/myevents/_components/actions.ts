import type { updateEventType } from "@/lib/types/db";

export const updateEvent = async (
  address: `0x${string}` | undefined,
  eventId: number,
  formData: updateEventType,
) => {
  try {
    const response = await fetch(`/api/myevents/${address}/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from API:", errorData.error);
    } else {
      const eventData = await response.json();
      console.log("New event data:", eventData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
