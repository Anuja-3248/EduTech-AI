import { FaceVerification } from "@/components/face-verification";
import { PageFrame } from "@/components/ui";

export default function FaceVerificationPage() {
  return (
    <PageFrame
      eyebrow="AI Face Verification"
      title="Live student identity verification"
      description="Register student face profiles and verify exam identity with liveness checks for blink, smile, and head movement."
    >
      <FaceVerification />
    </PageFrame>
  );
}
