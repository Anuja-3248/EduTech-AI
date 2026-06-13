import { QuestionVault } from "@/components/question-vault";
import { PageFrame } from "@/components/ui";

export default function VaultPage() {
  return (
    <PageFrame
      eyebrow="Secure Question Paper Vault"
      title="Encrypted custody with timed release"
      description="Upload, seal, monitor, and unlock national question papers through role-controlled cryptographic workflows."
    >
      <QuestionVault />
    </PageFrame>
  );
}
