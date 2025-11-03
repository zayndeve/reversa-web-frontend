// ✅ API URL (adjust from your environment variables)
export const serverApi: string =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

// ✅ General system messages for reuse
export const Messages = {
  generalError: "Something went wrong. Please try again later.",
  authRequired: "Please login first to continue.",
  validationError: "Please fill all required fields correctly.",
  emptyMessage: "Message cannot be empty.",
  invalidFileFormat: "Allowed file formats are only JPEG, JPG, PNG.",
};
