export function Alert({ icon, title, description, color = 'red' }) {
  const COLOR_MAP = {
    red: {
      icon: 'text-red-600',
      title: 'text-red-500',
      desc: 'text-red-600',
    },
    blue: {
      icon: 'text-blue-600',
      title: 'text-blue-500',
      desc: 'text-blue-700',
    },
  };

  const colorClass = COLOR_MAP[color] || COLOR_MAP.red;

  return (
    <div className={`flex items-center justify-start gap-2`}>
      <div className={`mt-1.5 ${colorClass.icon}`}>{icon}</div>
      <div>
        <p className={`text-sm text-start font-medium ${colorClass.title}`}>{title}</p>
        {description && <p className={`text-sm ${colorClass.desc} mt-1`}>{description}</p>}
      </div>
    </div>
  );
}
