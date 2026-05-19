import { I18n, lkeygen } from "@src/utils";
import { MaterialData } from "../../material";
import * as R from "remeda";
import { helpers } from "@data/helpers";
import { Spells } from "@data/spells";

export function createImbueDarkArmor(): MaterialData {
    const lkey = lkeygen("data.imbuement.elemental-storm.dark-armor" as const);

    const base: MaterialData = {
        type: "imbuement" as const,
        key: "imbue:dark-armor",
        label: I18n.key(lkey("label")),
        description: { type: "key", key: lkey("description") },
        itemPredicate: ["item:type:armor"],
        // The monster must have the darkness or shadow trait or an ability or
        // spell with the darkness or shadow trait.
        monsterPredicate: [
            {
                or: [
                    "self:trait:darkness",
                    "self:trait:shadow",
                    {
                        and: [
                            {
                                or: [
                                    "item:type:action",
                                    "item:type:melee",
                                    "item:type:spell",
                                ],
                            },
                            {
                                or: [
                                    "item:trait:darkness",
                                    "item:trait:shadow",
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
        header: {
            description: I18n.key(lkey("header.flavor")),
        },
    };

    return R.pipe(
        base,
        helpers.addGroup({
            labels: helpers.leveledLabels(
                [6, 8, 10, 16],
                helpers.sequentialData(
                    {
                        frequency: lkey("header.frequency.per-day"),
                        effect: lkey("header.activation-darkness-effect"),
                    },
                    { frequency: lkey("header.frequency.per-hour") },
                    {
                        frequency: lkey("header.frequency.per-10-minutes"),
                    },
                    {
                        effect: lkey(
                            "header.activation-darkness-effect-level-16",
                        ),
                    },
                ),
                ({ frequency, effect }) => ({
                    text: I18n.key(
                        lkey("header.activation-darkness-description"),
                        {
                            frequency: I18n.key(frequency),
                            effect: I18n.key(effect),
                        },
                    ),
                    sort: 1,
                }),
            ),
            effects: [
                ...helpers.leveledEffects([6, 8], [1, null], (max) =>
                    helpers.spellActivation({ uuid: Spells.Darkness, max }),
                ),
                {
                    levelMin: 16,
                    ...helpers.spellActivation({
                        uuid: Spells.Darkness,
                        rank: 4,
                    }),
                },
            ],
        }),
        helpers.addGroup({
            labels: helpers.leveledLabels(
                [12, 14, 18],
                [
                    "header.level-12-activation-darkvision",
                    "header.level-14-passive-darkvision",
                    "header.level-18-passive-darkvision",
                ],
                (key: Parameters<typeof lkey>[0]) => ({
                    text: I18n.key(lkey(key)),
                    sort: 2,
                }),
            ),
            effects: [
                {
                    levelMin: 14,
                    levelMax: 17,
                    type: "RuleElement",
                    rule: {
                        key: "Sense",
                        selector: "darkvision",
                    },
                },
                {
                    levelMin: 18,
                    type: "RuleElement",
                    rule: {
                        key: "Sense",
                        selector: "greater-darkvision",
                    },
                },
            ],
        }),
        helpers.addLabels({
            levelMin: 20,
            text: I18n.key(lkey("header.level-20-passive")),
            sort: 3,
        }),
    );
}
