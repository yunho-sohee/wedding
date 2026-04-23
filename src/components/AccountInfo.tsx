import { useState } from "react";

type Account = {
  role: string; // 아버지, 어머니, 신랑, 신부 등
  name: string;
  bank: string;
  number: string;
};

// TODO: 은행 · 계좌번호 실제 정보로 교체, 부모님 성함 추가
const GROOM_ACCOUNTS: Account[] = [
  { role: "신랑", name: "주윤호", bank: "국민은행", number: "000-0000-0000-00" },
  { role: "아버지", name: "주○○", bank: "국민은행", number: "000-0000-0000-00" },
  { role: "어머니", name: "○○○", bank: "국민은행", number: "000-0000-0000-00" },
];

const BRIDE_ACCOUNTS: Account[] = [
  { role: "신부", name: "성소희", bank: "신한은행", number: "000-000-000000" },
  { role: "아버지", name: "성○○", bank: "신한은행", number: "000-000-000000" },
  { role: "어머니", name: "○○○", bank: "신한은행", number: "000-000-000000" },
];

export function AccountInfo() {
  const [openSide, setOpenSide] = useState<"groom" | "bride" | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copy(number: string, key: string) {
    const text = number.replaceAll("-", "");
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      // fall through to fallback
    }
    if (!ok) {
      // Fallback for non-HTTPS / older mobile browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.left = "0";
      ta.style.opacity = "0";
      ta.setAttribute("readonly", "");
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(ta);
    }
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  }

  return (
    <section className="py-20 px-6 max-w-md mx-auto text-center border-t border-[color:var(--color-border-soft)]">
      <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] mb-3">
        Thanks
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-charcoal)] mb-4">
        마음 전하실 곳
      </h2>
      <p className="text-sm leading-relaxed text-[color:var(--color-muted)] mb-3 whitespace-pre-line">
        {"저희는 식을 따로 올리지 않습니다.\n멀리서 축하의 마음 보내주시려는 분들을 위해\n조심스레 계좌를 안내드립니다."}
      </p>
      <p className="text-sm leading-relaxed text-[color:var(--color-charcoal)] mb-10">
        보내주시는 따뜻한 마음만으로도 충분합니다.
      </p>

      <div className="space-y-3 text-left">
        <AccordionGroup
          label="신랑측"
          open={openSide === "groom"}
          onToggle={() => setOpenSide(openSide === "groom" ? null : "groom")}
          accounts={GROOM_ACCOUNTS}
          copiedKey={copiedKey}
          onCopy={copy}
          prefix="groom"
        />
        <AccordionGroup
          label="신부측"
          open={openSide === "bride"}
          onToggle={() => setOpenSide(openSide === "bride" ? null : "bride")}
          accounts={BRIDE_ACCOUNTS}
          copiedKey={copiedKey}
          onCopy={copy}
          prefix="bride"
        />
      </div>
    </section>
  );
}

function AccordionGroup({
  label,
  open,
  onToggle,
  accounts,
  copiedKey,
  onCopy,
  prefix,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  accounts: Account[];
  copiedKey: string | null;
  onCopy: (number: string, key: string) => void;
  prefix: string;
}) {
  return (
    <div className="border border-[color:var(--color-border-soft)] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-[color:var(--color-cream)] active:opacity-80"
      >
        <span className="text-sm font-medium tracking-wide text-[color:var(--color-charcoal)]">
          {label}
        </span>
        <span
          className={`text-[color:var(--color-muted)] text-lg transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ⌄
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="divide-y divide-[color:var(--color-border-soft)]">
            {accounts.map((a, i) => {
              const key = `${prefix}-${i}`;
              const copied = copiedKey === key;
              return (
                <li
                  key={key}
                  className="flex items-center justify-between px-5 py-4 gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-[color:var(--color-muted)] mb-1">
                      {a.role} · {a.name}
                    </p>
                    <p className="text-sm text-[color:var(--color-charcoal)] tabular-nums">
                      {a.bank} {a.number}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopy(a.number, key)}
                    className="shrink-0 text-xs tracking-wide px-3 py-1.5 rounded-full border border-[color:rgb(28_28_28_/_0.4)] text-[color:var(--color-charcoal)] active:opacity-80"
                    aria-label={`${a.name} 계좌번호 복사`}
                  >
                    {copied ? "복사됨" : "복사"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
