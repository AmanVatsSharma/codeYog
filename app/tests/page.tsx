import AICodeEditor from "@/components/codeEditor";
import { AppShell } from "@/components/layout/AppShell";

const CodeEditorPage = () => {
  return (
    <AppShell>
      <div className="surface rounded-xl p-2">
        <AICodeEditor />
      </div>
    </AppShell>
  );
}

export default CodeEditorPage