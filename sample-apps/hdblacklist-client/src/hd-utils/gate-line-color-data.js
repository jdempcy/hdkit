export const getGateName = (g) => {
    return gateNamesAndDescriptions[g][0];
}
export const getGateDescription = (g) => {
    return gateNamesAndDescriptions[g][1];
}
export const getLineName = (g, l) => {
    return lineNamesAndDescriptions[g][l][0];
}
export const getLineDescription = (g, l) => {
    return lineNamesAndDescriptions[g][l][1];
}
export const getLineExaltingPlanet = (g, l) => {
    return lineExaltations[g][l][0];
}
export const getLineExaltingDescription = (g, l) => {
    return lineExaltations[g][l][1];
}
export const getLineDetrimentingPlanet = (g, l) => {
    return lineDetriments[g][l][0];
}
export const getLineDetrimentingDescription = (g, l) => {
    return lineDetriments[g][l][1];
}
export const getMotivation = (c) => {
    return motivations[c];
}
export const getPerspective = (c) => {
    return perspectives[c];
}

const gateNamesAndDescriptions = {
    1: ["Self Expression", "The ability to manifest unlimited inspiration. Attention-getting creativity with a unique direction. Doing one's own thing while drawing attention to a possible new course for the group."],
    2: ["The Direction of the Self", "Receptivity is the foundation upon which all responses are built. The source of all movement and direction."],
    3: ["Ordering", "The fundamental task of initiation is to establish order and overcome disarray."],
    4: ["Formulization", "Logic as a technique of proving factuality. The tension of an uncertainty and the possibility of finding a resolution to it."],
    5: ["Fixed Rhythms", "The underlying synchronization with natural cycles. Being in the flow of the universal rhythm that ties all life forms together. Patterns and habits of a daily rhythm that are inherent to a person and are not forced upon them from without."],
    6: ["Friction", "The physical body's PH equilibrium is maintained by Gate 6. Establishing boundaries where emotional and intimate decisions about who gets in and who doesn't are made. Intimacy that is regulated by a hope-and-pain emotional cycle."],
    7: ["The Role of the Self", "The importance of leadership in guiding a well-ordered community. Following a logical path to lead into the future."],
    8: ["Contributions", "Contributing individual efforts to group aims is of fundamental value. Individuality's potentials are expressed here. Model conduct that is based on example rather than force or compulsion."],
    9: ["Focus", "Realizing potential through paying close attention to important details. The ability to sustain attention and the power of determination. Experimentation, testing, repetition, and practice done on a regular basis. The power of focus which allows for long-term comprehension."],
    10: ["The Behavior of the Self", "Formal perfection and survival. The desire to live and be alive. Human behavior that is geared toward self-awareness. A devotion to being one's authentic self."],
    11: ["Ideas", "Stimulation with the goal of sharing ideas. Realization opens up conceptual possibilities. Visual memory. The left eye serving as an interface to the right hemisphere of the brain."],
    12: ["Caution", "In facing temptation, the value of meditation and inactivity, as well as the character of restraint. The stranger releasing consciousness in the appropriate spirit and dose before withdrawing. Highly articulate when in the mood."],
    13: ["The Listener", "The ability to relate with oneself in a way that is open to future possibilities. Reflection that focuses on past events."],
    14: ["Power Skills", "Power is accumulated and retained by competent interaction, which combines elegance and control. At its most elevated, the fruitful, divine power. Fuel to empower oneself and steer the car in the right direction."],
    15: ["Extremes", "The quality of behavior that demonstrates a healthy balance between extremes. The magnetic self and its aura. Determines the environment's rhythm. Uncomfortable with rigid patterns."],
    16: ["Skills", "The enhancement of life by channeling energy harmonically. Repetition and experimenting are required for a high level of talent."],
    17: ["Opinions", "People who seek to govern must be able to serve. The teacher and the learner. Logic, comprehension, and language that can endure scrutiny and examination. The right eye, which can see well in the present moment or not. The experimental eye that looks for the fixed pattern and projects into the future from it."],
    18: ["Correction", "Using comparison to elicit feedback. A lifetime process of correcting and improving one's self. The desire for correction sharpens vital skills and knowledge."],
    19: ["Wanting", "The source of energy for the process of becoming more sensitive to our basic requirements. Recognizing tribal needs and assisting the tribe in gaining access to resources while being socially unrestricted. All revolutions are propelled by this power."],
    20: ["The Now", "Understanding is transformed into correct action through awareness. Contemplation of one's own existence. When knowing takes action."],
    21: ["The Hunter, the Huntress", "An egoic urge to be in charge and dominate. In order to overcome purposeful and persistent interference, the use of force is justified and essential. On the material level, power is required for survival."],
    22: ["Openness", "A personality trait that is best adapted to dealing with everyday and insignificant issues. The ability to use public access to empower others via personal emotion. The spirit of the knower is unleashed in a wave of grace. Realizing the spirit and sharing those spiritual insights with others."],
    23: ["Assimilation", "Acceptance of diversity based on awareness and understanding. Expression of one's own distinct and personal perspective to the group. Intolerance must be eradicated in order for new concepts and language to emerge. If communication isn't clear new awareness cannot be assimilated."],
    24: ["Rationalizing", "The process of change and rejuvenation that occurs naturally and spontaneously. This energy's purpose is to convey individual and distinct consciousness to the collective intellect. Trusting that the possibility of rationality will lead to genuine understanding is a risk and a test of spirit."],
    25: ["The Spirit of the Self", "Nature's unplanned and spontaneous perfection of movement. The archetypes of spiritual warrior, shaman, and priestess. The ability to love existence without prejudice. A place where a flower may be adored as much as a human. Love that is transcendent and global but might look cold or distant. Where everyone is deserving of love in equal measure. Where adversity leads to success and survival, the spirit is enriched."],
    26: ["The Egoist", "Memory manipulation for personal or tribal advantage. Trickster energy. The information that comes through this gate might be either magnificent truths or great falsehoods. This is the thymus gland and the ego's strength Gate."],
    27: ["Caring", "A source of energy and expression for sexuality and reproduction. Nourishment and being nourished. Preservation is achieved when ideals and the manifestation of care come together. Caring for the weak, ill, and defenseless with compassion."],
    28: ["The Game Player", "In the present, awareness of what's worth dealing with or not. Our deepest dread, the fear of death, calls this place home. Where existence itself is a game and a struggle. Risks and repercussions are a personal process that leads to immediate knowledge. This knowledge informs the collective of its present mutation and, if bought into, may guide the collective."],
    29: ["Saying Yes", "The mechanical need to say yes. What one commits to experientially must be finished. This is the fuel that allows you to persevere in the face of adversity. This is the point at which you start piling up obligations and responsibilities so that you have something to look forward to. Saying yes to what is correct is the key."],
    30: ["Feelings", "Limitation is acknowledged as fate, and freedom is understood as an illusion. The emotional counterpart of mental realization. Recognizing a feeling leads to the possibility of conceptual transformation. The possibility for awareness to notice an emotion while leaving the consequence to chance."],
    31: ["Leading", "The verbal manifestation of leadership. The manifestation of influence. Unlike the manifested gates of the Throat, Gate 31 is not primarily about action, but rather about communication. This is the ability to communicate logical leadership to the collective."],
    32: ["Continuity", "The ability of consciousness to adjust in the present moment while maintaining continuity. Instinctive imprinting is based in this part of the body. Individual survival is at the heart of conservatism. The ability to recognize what can and cannot be changed."],
    33: ["Privacy", "Active withdrawal is the process of transforming a weak position into a strong one. The prodigal son or daughter. In order to assimilate experience and impart the wisdom learned, there is a need for quiet and retreat. The preservation and dissemination of cultural memory, which aids in the growth of human ability. Humanity's storytellers and historians."],
    34: ["Might", "Pure, unadulterated power, ready to be displayed and used. Individualization's fuel. The ability to be self-sufficient, as well as the energy of conviction. Gate 34 is an unaware energy source with a never-ending supply."],
    35: ["Change", "This is where you may satisfy your desire for change. This is the anticipation channel, yet there is no light at the end of the tunnel, none at all. 'I believe if I do this, I'll be able to acquire that' is neither a formula or a statement of fact. It is a hope that will always result in suffering. This isn't the kind of design where you can afford to be goal-oriented. This is the gate of the turning of the wheel."],
    36: ["Crisis", "Feelings are recognized, and this leads to transformation. Changes in feeling are natural and must be absorbed and recognized via awareness on the experiential way."],
    37: ["Friendship", "This energy develops, sustains, and maintains groups by being kind and communal. Loyalty is sought, and agreements are made. The natural, uncontrived character of communities."],
    38: ["The Fighter", "Energy that is required for survival and to battle our fear of death. The fuel to persevere in the face of adversity."],
    39: ["The Provocateur", "The provocateur is on the lookout for the spirit and attempting to elicit its manifestation. This fuel also allows this gate the energy to endure, to deal with the feelings that this process creates, because it is continually yearning for its spirit. The fuel to find the spirit."],
    40: ["Aloneness", "The point where struggle and emancipation meet. Our desire for community in a bargain with social apprehension and our desire for aloneness. Where emotional support galvanizes willpower and loyalty benefits the community."],
    41: ["Contraction", "The constraint of resources that allows for maximum possible development. The development of knowledge over time. When making judgments based on the emotional wave, patience is a virtue."],
    42: ["Growth", "The growth of resources that maximizes development. Bringing things to a close in order to move on to the next stage. The ability to mature through the conclusion of each cycle is the potential for growth."],
    43: ["Insight", "Where inner truth is translated into a distinct perspective. Individual mental knowledge can be delusory if it is not founded on facts. To stand behind inner understanding, one needs fortitude, strength, and bravery. The final molding of consciousness before it is manifested through the Throat."],
    44: ["Alertness", "Entrepreneurial design with a capitalist bent. To convey one's ego to the tribe, one must rely on instinct and memory. Instinctive memory in the present, triggered by patterns in the past. Memory that is quick and instinctive."],
    45: ["The Gatherer", "Natural, beneficial attraction of like forces. The Key to harmony within the community. Authority and education for the tribe."],
    46: ["Determination", "Good luck and discovery. Everything is predicated on the Self's determination. Succeeding where others fail is also a failing where others succeed. Accepting that one is at the correct place is a very spiritual decision. It is a surrender to the cycle. Unless the abstract being can embrace and commit to the cyclic nature of their life, their bodies disintegrate under the relentless stress of crisis, disappointment, and upheaval."],
    47: ["Realizing", "A harrowing journey of self-discovery. The worry and anxiety that comes with mental stress. Patience and waiting, as well as combing through material until an ah-ha moment occurs. An abstract process that necessitates experience rather than facts."],
    48: ["Depth", "Depth determined by focus and concentration on patterns. Recognition of which patterns are most important to concentrate on. The building blocks of genius. Depth that is either important or unimportant, and that is supposed to be communicated either way."],
    49: ["Rejection", "The ability to recognize what and who is required to preserve or reorganize the community."],
    50: ["Values", "Values from the past that serve and improve the present and future. Taste, intuition, and instinct are all governed by tribal law in Gate 50. This is a crucial step in our overall well-being as it cultivates our capacity to analyze and protect ourselves, as well as our own immunity. The core of our defense is our values."],
    51: ["Shock", "The ability to respond to chaos and shock by recognizing and adapting to it. Taking initiative as an individual. The ability to compete. The love of life itself and the obstacles it poses to our existence. Wounding."],
    52: ["Inaction", "Inaction for the purpose of assessment that is both temporary and self-imposed. Using energy to focus in a way that promotes long-term progress. Restraint allows for a more efficient allocation of resources and energy. When you withdraw from something, you gain the benefits of focus."],
    53: ["Beginnings", "This is an energy that is constantly looking for fresh beginnings. The whole Sensing Circuit necessitates patience. The pressure to get started isn't something you're conscious of. It's a mechanic, after all. The pressure rises and falls like a wave. It is always there. The passion that began in one moment will fade in the next. Wait and see what happens. There's no use in starting something you're not going to finish. This is the source of energy for the maturation process."],
    54: ["Ambition", "Ascending the ladder of success. Drive to transform material circumstances, as well as the ambition to explore metaphysical places and viewpoints beyond material distractions. The desire to change one's memories. This is where genetic memory is stored in the body's liquids."],
    55: ["Spirit", "Abundance is a question of spirit, not material circumstances.  Emotional constraints are sensed here. The emotional hope-to-pain cycle's wave frequency. This frequency manifests itself in moods."],
    56: ["Stimulation", "Movement provides stability. Continuity is achieved through the connection of short-term activities together. Taking an abstract idea and turning it into language. Experiential expression rather than factual expression. A concept that isn't a solution, but rather a step along the path of a seeker. An abstract projection that looks back in time."],
    57: ["Intuition", "The tremendous power of clarity. The intuitive revelation that has the potential to reach the core of the present moment. Using trial and error to transform the lessons acquired. Fear of the future that can be alleviated by listening to one's intuition in the present."],
    58: ["Aliveness", "An insatiability that cannot remain content in the present moment. Energy that is critical and restless with the ability to stimulate and guide vigor. Always on the lookout for a better life. The willingness to question what can be better."],
    59: ["Sexuality", "The capacity to overcome obstacles in order to attain oneness. The prospect of closeness and connection. A profound need to connect with people leads to fertility that isn't just about reproduction. Sexual energy that can cause conflict and misunderstanding."],
    60: ["Acceptance", "Accepting one's limitations as a first step toward transcendence. The throbbing pressure to mutate. Individual expressions of knowledge that may or may not be valuable to the larger community."],
    61: ["Mystery", "The need to comprehend the ultimate, as well as the possibility of Inner Truth descending as silence and stillness. The awareness of fundamental principles of the cosmos."],
    62: ["Detail", "Everything must be given a name in order for the Collective to comprehend its surroundings. The capacity to rationally detail the concept, not the concept itself, determines the quality of the viewpoint. The idea of how things should be ordered must be pass through the crucible of testing, repetition, and experimentation. This is the starting point for language development and the common basis for sharing human experience."],
    63: ["Doubt", "Doubt is the source of the entire logical system's motivation. The stress of ambiguity necessitates proof. The journey of understanding begins with doubt. Questioning is the fuel, and the yearning for a response is the pressure."],
    64: ["Confusion", "Transition, like birth, demands a strong will to go through it. Filtering is required due to mental activity and strain. Experiencing the current moment in order to acquire information and reflect on it thereafter. A deluge of images anchored in the past that must be processed."]
}


const lineNamesAndDescriptions = {
    1: {
        1: ["Creation is independent of will", ""],
        2: ["Love is light", ""],
        3: ["The energy to sustain creative work", ""],
        4: ["Aloneness as the medium of creativity", ""],
        5: ["The energy to attract society", ""],
        6: ["Objectivity", ""]   
    },
    2: {
        1: ["Intuition", ""],
        2: ["Genius", ""],
        3: ["Patience", ""],
        4: ["Secretiveness", ""],
        5: ["Intelligent application", ""],
        6: ["Fixation", ""]   
    },
    3: {
        1: ["Synthesis", ""],
        2: ["Immaturity", ""],
        3: ["Survival", ""],
        4: ["Charisma", ""],
        5: ["Victimization", ""],
        6: ["Surrender", ""]   
    },
    4: {
        1: ["Pleasure", ""],
        2: ["Acceptance", ""],
        3: ["Irresponsibility", ""],
        4: ["The liar", ""],
        5: ["Seduction", ""],
        6: ["Excess", ""]   
    },
    5: {
        1: ["Perseverance", ""],
        2: ["Inner peace", ""],
        3: ["Compulsiveness", ""],
        4: ["The hunter", ""],
        5: ["Joy", ""],
        6: ["Yielding", ""]   
    },
    6: {
        1: ["Retreat", ""],
        2: ["The guerilla", ""],
        3: ["Allegiance", ""],
        4: ["Triumph", ""],
        5: ["Arbitration", ""],
        6: ["The peacemaker", ""]   
    },
    7: {
        1: ["The authoritarian", ""],
        2: ["The democrat", ""],
        3: ["The anarchist", ""],
        4: ["The abdicator", ""],
        5: ["The general", ""],
        6: ["The administrator", ""]   
    },
    8: {
        1: ["Honesty", ""],
        2: ["Service", ""],
        3: ["The phony", ""],
        4: ["Respect", ""],
        5: ["Dharma", ""],
        6: ["Communion", ""]   
    },
    9: {
        1: ["Sensibility", ""],
        2: ["Misery loves company", ""],
        3: ["The straw that breaks the camel's back", ""],
        4: ["Dedication", ""],
        5: ["Faith", ""],
        6: ["Gratitude", ""]   
    },
    10: {
        1: ["Modesty", ""],
        2: ["The hermit", ""],
        3: ["The martyr", ""],
        4: ["The opportunist", ""],
        5: ["The heretic", ""],
        6: ["The role model", ""]   
    },
    11: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    12: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    13: {
        1: ["Empathy", "The ability to relate and commune with everyone with equanimity."],
        2: ["Bigotry", "The risk, always present, that fellowship can only exist for a particular type, whether racial, religious, national or intellectual."],
        3: ["Pessimism", "The belief that what is best can never be achieved."],
        4: ["Fatigue", "The point of exhaustion eventually reached when one is too tired to fight."],
        5: ["The Savior", "The ability to overcome all obstacles for the betterment of humanity."],
        6: ["The Optimist", "The ability to accept any limited interaction as a necessary step towards greater union."]   
    },
    14: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    15: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    16: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    17: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    18: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    19: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    20: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    21: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    22: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    23: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    24: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    25: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    26: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    27: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    28: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    29: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    30: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    31: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    32: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    33: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    34: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    35: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    36: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    37: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    38: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    39: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    40: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    41: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    42: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    43: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    44: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    45: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    46: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    47: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    48: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    49: {
        1: ["The law of necessity", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["Attraction", "Neptune exalted. An innate impressionability that transforms the fence-sitter into the committed. The sensitivity and potential to embrace and transform others. Saturn detriment. Stubborn, and often fatal, rejectionism. Oversensitivity that leads to rejection of principles and others as a rule."]   
    },
    50: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    51: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    52: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    53: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    54: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    55: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    56: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    57: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    58: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    59: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    60: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    61: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    62: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    63: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    64: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    }
}
const lineExaltations = {
    1: {
        1: ["Moon", ""],
        2: ["Venus", ""],
        3: ["Mars", ""],
        4: ["Earth", ""],
        5: ["Mars", ""],
        6: ["Earth", ""]   
    },
    2: {
        1: ["Venus", ""],
        2: ["Saturn", ""],
        3: ["Jupiter", ""],
        4: ["Venus", ""],
        5: ["Mercury", ""],
        6: ["Mercury", ""]   
    },
    3: {
        1: ["Earth", ""],
        2: ["Mars", ""],
        3: ["Venus", ""],
        4: ["Neptune", ""],
        5: ["Mars", ""],
        6: ["Sun", ""]   
    },
    4: {
        1: ["Moon", ""],
        2: ["Moon", ""],
        3: ["Venus", ""],
        4: ["Sun", ""],
        5: ["Jupiter", ""],
        6: ["Mercury", ""]   
    },
    5: {
        1: ["Mars", ""],
        2: ["Venus", ""],
        3: ["Neptune", ""],
        4: ["Uranus", ""],
        5: ["Venus", ""],
        6: ["Neptune", ""]   
    },
    6: {
        1: ["Pluto", ""],
        2: ["Venus", ""],
        3: ["Neptune", ""],
        4: ["Sun", ""],
        5: ["Venus", ""],
        6: ["Mercury", ""]   
    },
    7: {
        1: ["Venus", ""],
        2: ["Neptune", ""],
        3: ["Moon", ""],
        4: ["Sun", ""],
        5: ["Venus", ""],
        6: ["Mercury", ""]   
    },
    8: {
        1: ["Neptune", ""],
        2: ["Sun", ""],
        3: ["Moon", ""],
        4: ["Jupiter", ""],
        5: ["Jupiter", ""],
        6: ["Venus", ""]   
    },
    9: {
        1: ["Pluto", ""],
        2: ["Pluto", ""],
        3: ["Earth", ""],
        4: ["Moon", ""],
        5: ["Jupiter", ""],
        6: ["Moon", ""]   
    },
    10: {
        1: ["Sun", ""],
        2: ["Mercury", ""],
        3: ["Earth", ""],
        4: ["Uranus", ""],
        5: ["Jupiter", ""],
        6: ["Pluto", ""]   
    },
    11: {
        1: ["Moon", ""],
        2: ["Neptune", ""],
        3: ["Pluto", ""],
        4: ["Moon", ""],
        5: ["Moon", ""],
        6: ["Neptune", ""]   
    },
    12: {
        1: ["Venus", ""],
        2: ["Saturn", ""],
        3: ["Neptune", ""],
        4: ["Earth", ""],
        5: ["Sun", ""],
        6: ["Sun", ""]   
    },
    13: {
        1: ["Venus", "Harmony through affection."],
        2: ["Moon", "Tolerance as the least offensive manifestation of bigotry."],
        3: ["Earth", "A lack of trust that can only be transformed through concrete evidence."],
        4: ["Pluto", "The renaissance that comes with truce and its eventual reinvigoration."],
        5: ["Neptune", "The charismatic genius who can find a role for everyone."],
        6: ["Mars", "The energy to persevere. Unlimited hope."]   
    },
    14: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    15: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    16: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    17: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    18: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    19: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    20: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    21: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    22: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    23: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    24: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    25: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    26: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    27: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    28: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    29: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    30: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    31: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    32: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    33: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    34: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    35: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    36: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    37: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    38: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    39: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    40: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    41: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    42: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    43: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    44: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    45: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    46: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    47: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    48: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    49: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    50: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    51: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    52: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    53: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    54: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    55: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    56: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    57: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    58: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    59: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    60: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    61: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    62: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    63: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    64: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    }
}

const lineDetriments = {
    1: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    2: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    3: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    4: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    5: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    6: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    7: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    8: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    9: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    10: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    11: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    12: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    13: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    14: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    15: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    16: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    17: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    18: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    19: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    20: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    21: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    22: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    23: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    24: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    25: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    26: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    27: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    28: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    29: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    30: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    31: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    32: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    33: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    34: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    35: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    36: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    37: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    38: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    39: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    40: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    41: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    42: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    43: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    44: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    45: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    46: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    47: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    48: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    49: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    50: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    51: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    52: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    53: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    54: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    55: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    56: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    57: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    58: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    59: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    60: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    61: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    62: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    63: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    },
    64: {
        1: ["", ""],
        2: ["", ""],
        3: ["", ""],
        4: ["", ""],
        5: ["", ""],
        6: ["", ""]   
    }
}

const motivations = {
    1: "Fear",
    2: "Hope",
    3: "Desire",
    4: "Need",
    5: "Guilt",
    6: "Innocence"
}
  
const perspectives = {
    1: "Survival",
    2: "Possibility",
    3: "Power",
    4: "Wanting",
    5: "Probability",
    6: "Personal"
}