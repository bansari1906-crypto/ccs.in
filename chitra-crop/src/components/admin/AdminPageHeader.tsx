import { Button } from "@/components/ui/button";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  actionText,
  onAction,
  actionIcon,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-3xl border border-green-100 bg-white p-6 shadow-sm mb-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p>
      </div>
      {actionText && onAction && (
        <Button onClick={onAction} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
          {actionIcon}
          {actionText}
        </Button>
      )}
    </div>
  );
}
