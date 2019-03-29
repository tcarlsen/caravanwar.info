module Jekyll
  module ThousandsSeparatedFilter
    def thousands_separated(input)
      "test"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ThousandsSeparatedFilter)
