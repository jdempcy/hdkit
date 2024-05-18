module DidYouMean
  SPELL_CHECKERS.merge!({
    'SmartKv::KeyError' => KeyErrorChecker
  })
end
